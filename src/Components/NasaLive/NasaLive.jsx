import React, { useEffect, useState, useMemo } from 'react'

const HOUR_MS = 60 * 60 * 1000

function NasaLive({ apiKey }) {
  const [apod, setApod] = useState(null)
  const [epic, setEpic] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const nowTs = Date.now()
  
  // Use a recent UTC date for Worldview snapshots to avoid night-side black images
  const computeSnapshotDate = () => {
    const d = new Date();
    // If it's earlier in the UTC day, use yesterday to ensure imagery availability
    if (d.getUTCHours() < 18) {
      d.setUTCDate(d.getUTCDate() - 1);
    }
    return d.toISOString().slice(0, 10);
  };

  const snapDateStr = computeSnapshotDate()

  const NASA_BASE = import.meta.env && import.meta.env.DEV ? '/nasa' : 'https://api.nasa.gov'
  const IMG_BASE = import.meta.env && import.meta.env.DEV ? '/nasa-img' : 'https://images-api.nasa.gov'

  const fetchAPOD = async () => {
    // Request multiple with thumbnails to avoid video cases and increase chance of an image
    const url = `${NASA_BASE}/planetary/apod?api_key=${apiKey}&count=5&thumbs=true`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`APOD error: ${res.status} ${res.statusText}`)
    const data = await res.json()
    const items = Array.isArray(data) ? data : [data]
    const img = items.find(i => i.media_type === 'image' && (i.hdurl || i.url))
      || items.find(i => i.thumbnail_url)
    if (img) {
      return {
        title: img.title || 'Astronomy Picture',
        url: img.hdurl || img.url || img.thumbnail_url,
        date: img.date,
        explanation: img.explanation || ''
      }
    }
    throw new Error('APOD returned no image or thumbnail')
  }

  const fetchEPIC = async () => {
    try {
      // Use official API for metadata (more reliable CORS), then build archive URL on gsfc host
      const todayStr = new Date().toISOString().slice(0, 10)
      // First, try the date-specific endpoint for today
      let item = null
      try {
        const dayRes = await fetch(`https://epic.gsfc.nasa.gov/api/natural/date/${todayStr}`)
        if (dayRes.ok) {
          const dayList = await dayRes.json()
          if (Array.isArray(dayList) && dayList.length > 0) {
            // Use the latest item from today
            item = dayList.reduce((a, b) => (new Date(a.date) > new Date(b.date) ? a : b))
          }
        }
      } catch {}

      if (!item) {
        // Fallback to latest list and pick the most recent by date
        const api = `https://epic.gsfc.nasa.gov/api/natural`
        const res = await fetch(api)
        if (!res.ok) throw new Error(`EPIC error: ${res.status} ${res.statusText}`)
        const list = await res.json()
        if (!Array.isArray(list) || list.length === 0) throw new Error('No EPIC images available')
        item = list.reduce((a, b) => (new Date(a.date) > new Date(b.date) ? a : b))
      }
      const date = new Date(item.date)
      const y = date.getUTCFullYear()
      const m = String(date.getUTCMonth() + 1).padStart(2, '0')
      const d = String(date.getUTCDate()).padStart(2, '0')
      const image = item.image
      // EPIC archive lives on epic.gsfc.nasa.gov (no api key needed on static host)
      const imgUrl = `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${d}/png/${image}.png`
      return {
        title: 'Earth from DSCOVR (EPIC)',
        url: imgUrl,
        date: item.date,
        caption: item.caption || ''
      }
    } catch (e) {
      // Alternate API call: NASA Worldview Snapshot (daylight region) with coastlines overlay
      const base = 'https://wvs.earthdata.nasa.gov/api/v1/snapshot'
      const regionBbox = '60,0,100,30' // India/Asia region example to reduce night coverage
      const params = new URLSearchParams({
        REQUEST: 'GetSnapshot',
        WIDTH: '1024',
        HEIGHT: '576',
        BBOX: regionBbox,
        CRS: 'EPSG:4326',
        FORMAT: 'image/jpeg',
        TIME: computeSnapshotDate(),
        LAYERS: 'MODIS_Terra_CorrectedReflectance_TrueColor,Coastlines',
        OPACITIES: '1,1'
      }).toString()
      return {
        title: 'Earth • True Color (Worldview)',
        url: `${base}?${params}`,
        date: computeSnapshotDate(),
        caption: 'NASA Worldview Snapshot fallback'
      }
    }
  }

  // Lightweight fetch with timeout to avoid long hangs
  const fetchWithTimeout = async (url, ms = 3500) => {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), ms)
    try {
      const res = await fetch(url, { signal: controller.signal })
      return res
    } finally {
      clearTimeout(id)
    }
  }

  const generateTodayImages = async () => {
    try {
      setGenerating(true)
      setError(null)
      const out = []
      const today = new Date()
      const dateStr = today.toISOString().slice(0, 10)

      // We'll collect chunks to enforce ordering: Sun -> Satellites -> EPIC
      const sunItems = []
      const satItems = []
      const epicItems = []

      // Mars disabled (Option A)

      // Static SDO images (no network latency)
      const sunCandidates = [
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg'
      ]
      sunCandidates.forEach(u => sunItems.push({ source: 'Sun • SDO', url: u, date: dateStr, title: 'Solar Observatory' }))
      // Render Sun first
      setItems(prev => {
        const dedup = []
        const seen = new Set()
        for (const it of sunItems) { if (!seen.has(it.url)) { seen.add(it.url); dedup.push(it) } }
        return dedup
      })

      // Satellites next
      const goesFeeds = [
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Full Disk' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES18/ABI/FD/GEOCOLOR/Latest.jpg', label: 'GOES-18 • Full Disk' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/NorthAmerica/GEOCOLOR/Latest.jpg', label: 'GOES-16 • North America' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES18/ABI/Pacific/GEOCOLOR/Latest.jpg', label: 'GOES-18 • Pacific' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/cgl/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Gulf/Caribbean' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES18/ABI/SECTOR/psw/GEOCOLOR/Latest.jpg', label: 'GOES-18 • Pacific SW' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/ne/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Northeast US' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/se/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Southeast US' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/mw/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Midwest US' },
        { url: 'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/SECTOR/sw/GEOCOLOR/Latest.jpg', label: 'GOES-16 • Southwest US' }
      ]
      goesFeeds.forEach(g => satItems.push({ source: 'Satellites • GOES', url: g.url, date: dateStr, title: g.label }))
      setItems(prev => {
        const seen = new Set(prev.map(p => p.url))
        const merged = [...prev]
        for (const it of satItems) { if (!seen.has(it.url)) { seen.add(it.url); merged.push(it) } }
        return merged
      })

      // EPIC last (short timeout)
      try {
        const epicRes = await fetchWithTimeout('https://epic.gsfc.nasa.gov/api/natural', 2500)
        if (epicRes && epicRes.ok) {
          const epicList = await epicRes.json()
          const few = epicList.slice(0, 4)
          for (const e of few) {
            const dt = new Date(e.date)
            const y = dt.getUTCFullYear()
            const m = String(dt.getUTCMonth() + 1).padStart(2, '0')
            const d = String(dt.getUTCDate()).padStart(2, '0')
            const image = e.image
            epicItems.push({ source: 'Earth • EPIC', url: `https://epic.gsfc.nasa.gov/archive/natural/${y}/${m}/${d}/png/${image}.png`, date: e.date, title: 'Earth from DSCOVR' })
          }
          setItems(prev => {
            const seen = new Set(prev.map(p => p.url))
            const merged = [...prev]
            for (const it of epicItems) { if (!seen.has(it.url)) { seen.add(it.url); merged.push(it) } }
            return merged
          })
        }
      } catch {}

      // Ensure at least 10 cards by repeating GOES/SDO with cache-busting
      const fillerUrls = [
        'https://cdn.star.nesdis.noaa.gov/GOES16/ABI/FD/GEOCOLOR/Latest.jpg',
        'https://cdn.star.nesdis.noaa.gov/GOES18/ABI/FD/GEOCOLOR/Latest.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0211.jpg',
        'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg'
      ]
      let k = 0
      setItems(prev => {
        const merged = [...prev]
        while (merged.length < 10) {
          const base = fillerUrls[k % fillerUrls.length]
          const sep = base.includes('?') ? '&' : '?'
          const filled = `${base}${sep}v=${k + 1}`
          merged.push({ source: 'Satellites', url: filled, date: dateStr, title: 'Satellite Image' })
          k++
        }
        return merged
      })
      // Done
    } catch (e) {
      setError(e.message || 'Failed to generate images')
    } finally {
      setGenerating(false)
    }
  }

  const load = async () => {
    try {
      setLoading(true)
      setError(null)

      // Local cache to avoid unnecessary calls within the hour
      const now = Date.now()
      const cacheRaw = localStorage.getItem('nasa_live_cache_v1')
      const cache = cacheRaw ? JSON.parse(cacheRaw) : null
      if (cache && now - cache.timestamp < HOUR_MS) {
        setApod(cache.apod || null)
        setEpic(cache.epic || null)
        setLoading(false)
        return
      }

      const [apodData, epicData] = await Promise.allSettled([fetchAPOD(), fetchEPIC()])
      const apodVal = apodData.status === 'fulfilled' ? apodData.value : null
      const epicVal = epicData.status === 'fulfilled' ? epicData.value : null

      if (!apodVal && !epicVal) throw new Error('Unable to load NASA images')

      setApod(apodVal)
      setEpic(epicVal)

      localStorage.setItem('nasa_live_cache_v1', JSON.stringify({ 
        timestamp: now, 
        apod: apodVal, 
        epic: epicVal 
      }))
      
      setLoading(false)
    } catch (e) {
      setError(e.message || 'Failed to load NASA images')
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    const id = setInterval(load, HOUR_MS)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <section className="w-full bg-[#060010] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-10 sm:py-14 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">NASA Live</h2>
            <p className="text-gray-400 text-sm mt-1">Fetching latest earth and space imagery...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="aspect-[16/10] w-full rounded-xl bg-white/5 animate-pulse" />
            <div className="aspect-[16/10] w-full rounded-xl bg-white/5 animate-pulse" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full bg-[#060010] text-white px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">NASA Live</h2>
            <p className="text-gray-400 text-sm mt-1">Earth and Sun updated Hourly.</p>
          </div>
          <div className="text-xs text-gray-500 hidden sm:block">Source: NASA APIs</div>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-400">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20 mt-10">
            {/* Earth EPIC card (non-navigating) */}
          {epic && (
            <div className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <div className="aspect-[16/] w-full overflow-hidden">
                <img
                  src={epic.url}
                  alt={epic.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    try {
                      const jpg = e.currentTarget.src.replace('/png/', '/jpg/').replace('.png', '.jpg')
                      if (e.currentTarget.src !== jpg) {
                        e.currentTarget.src = jpg
                      }
                    } catch {}
                  }}
                />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-400">Earth • EPIC • {new Date(epic.date).toISOString().slice(0,10)}</div>
                <div className="font-semibold mt-1">{epic.title}</div>
              </div>
            </div>
          )}
          {/* Sun card (non-navigating) */}
          <div className="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
            <div className="aspect-[16/] w-full overflow-hidden">
              <img
                src={`https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0171.jpg?t=${nowTs}`}
                alt={'Sun • SDO'}
                className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  try {
                    const altUrl = `https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0193.jpg?t=${nowTs}`
                    if (e.currentTarget.src !== altUrl) e.currentTarget.src = altUrl
                  } catch {}
                }}
              />
            </div>
            <div className="p-4">
              <div className="text-xs text-gray-400">Sun • SDO</div>
              <div className="font-semibold mt-1">Solar Dynamics Observatory</div>
            </div>
          </div>


        </div>

      </div>
    </section>
  )
}

export default NasaLive
