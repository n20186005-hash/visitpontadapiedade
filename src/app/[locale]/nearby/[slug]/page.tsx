import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PLACES } from '@/lib/places';
import { SITE_URL } from '@/i18n/routing';

type RouteParams = Promise<{ locale: string; slug: string }>;
export function generateStaticParams() { return PLACES.map(p => ({locale:'en',slug:p.slug})); }
export async function generateMetadata({params}:{params:RouteParams}):Promise<Metadata> {
  const {locale,slug}=await params;
  const p=PLACES.find(x=>x.slug===slug);
  if(locale!=='en'||!p)return {};
  const url=`${SITE_URL}/en/nearby/${slug}`;
  const title=`${p.name} in Lagos: Views, Walking Route & Map`;
  const description=`Explore ${p.name} near Ponta da Piedade, Lagos. Coastal features, visiting tips, photography, safe access and the matching Google Maps location.`;
  return {title,description,alternates:{canonical:url},openGraph:{title,description,url,images:[`${SITE_URL}/nearby/${slug}.jpg`]},robots:{index:true,follow:true}};
}
export default async function NearbyPlacePage({params}:{params:RouteParams}) {
  const {locale,slug}=await params;
  const place=PLACES.find(p=>p.slug===slug);
  if(locale!=='en'||!place)notFound();
  setRequestLocale(locale);
  const related=PLACES.filter(p=>p.slug!==slug).slice(0,6);
  const isBuilt=place.category==='Lighthouse landmark'||place.category==='Coastal boardwalk'||place.category==='Scenic rest area';
  const faq=[
    [`Where exactly is ${place.name}?`,`Use the dedicated map link on this page. The named location sits in the Ponta da Piedade/Lagos coastal area, Algarve, Portugal; the pin is not replaced by the generic lighthouse map.`],
    [`What makes ${place.name} worth visiting?`,place.feature],
    ['How should I reach the viewpoint?',place.access],
    ['When is the best time for photographs?',`${place.photography} Softer light near the beginning or end of the day usually helps, although the sun angle changes with the seasons.`],
    ['Are there entry fees or fixed hours?','Outdoor paths and viewpoints do not necessarily operate like staffed attractions. Check on-site access signs and any seasonal restrictions. Tours, parking or managed facilities may have separate charges.'],
    ['Is it suitable for children or visitors with limited mobility?',`Conditions vary by path and platform. Check slope, stairs, barriers and surface quality locally before setting off. ${place.safety}`]
  ];
  const sections=[
    {heading:'Explore the setting',text:`${place.setting} ${place.feature} A short pause here works well as part of a wider Ponta da Piedade visit, where the landscape changes noticeably with the direction of the light and sea conditions.`},
    {heading:'History, geology and character',text:isBuilt?`The Lagos headland has long been connected with Atlantic seafaring and coastal navigation. Its modern visitor infrastructure sits in a landscape shaped by marine erosion, wind and changing shoreline access. ${place.name} is part of this meeting between human use of the headland and the natural cliffs; observe the materials, practical layout and relationship to nearby paths and viewpoints.`:`The golden coastal cliffs around Lagos contain sedimentary layers gradually worked by waves, wind and weather. Softer sections erode into inlets and openings, while more resistant portions remain as ledges, arches and isolated pillars. ${place.name} offers a distinctive way to read this process from the coast; the rock forms continue to change, so do not assume every formation will look identical to older photographs.`},
    {heading:'Details to observe',text:`Take time to notice the cliff strata, the way the waves meet the base of the rocks, and the contrast between exposed stone and sparse coastal vegetation. ${place.feature} On clear days, small boats offshore offer a sense of scale; in haze or high swell, the same perspective can look very different.`},
    {heading:'Arrival and transport',text:`${place.access} From central Lagos, visitors can approach the wider Ponta da Piedade area by road transport or on foot. Parking capacity and permitted driving access can change, especially in busy periods. For the final segment, follow the individual map pin and posted pedestrian signs instead of assuming a straight-line route across the cliffs.`},
    {heading:'Suggested walking itinerary',text:`1. Begin at a permitted road or pedestrian access point and orient yourself using the dedicated map. 2. Follow established boardwalks and signed paths towards ${place.name}. 3. Pause to observe the viewpoint and take photographs from safe ground. 4. Continue towards another marked lookout if conditions allow, or return by the same safe route. ${place.safety}`},
    {heading:'Photography positions',text:`${place.photography} A wide lens helps communicate the headland's scale, while a moderate zoom isolates details in the rock. Take a second photograph that includes the surrounding path or coastline to provide context; never cross a railing to remove it from the frame.`},
    {heading:'Practical visiting advice',text:`Bring drinking water, sun protection, shoes with grip and a light layer for Atlantic winds. There is limited shade along much of the exposed coast. ${place.safety} Check local notices for any work, closures or weather restrictions, and do not approach the base of cliffs in rough surf.`},
  ];
  const url=`${SITE_URL}/en/nearby/${slug}`;
  const attractionLd={'@context':'https://schema.org','@type':'TouristAttraction',name:place.name,url,hasMap:place.map,description:place.feature,address:{'@type':'PostalAddress',addressLocality:'Lagos',addressRegion:'Algarve',addressCountry:'PT'},image:`${SITE_URL}/nearby/${slug}.jpg`};
  const breadcrumbLd={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Ponta da Piedade',item:`${SITE_URL}/en`},{'@type':'ListItem',position:2,name:place.name,item:url}]};
  return <><Header/><main className="max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16">
    <nav aria-label="Breadcrumb" className="text-sm mb-8" style={{color:'var(--text-muted)'}}><a href="/en" style={{color:'var(--accent)'}}>Ponta da Piedade</a> / {place.name}</nav>
    <div className="grid md:grid-cols-2 gap-8 items-center mb-14"><div><p className="uppercase tracking-wide text-sm mb-3" style={{color:'var(--accent)'}}>{place.category} · Lagos, Algarve</p><h1 className="font-display text-4xl sm:text-5xl font-semibold mb-5" style={{color:'var(--text-primary)'}}>{place.name}</h1><p className="text-lg leading-relaxed mb-6" style={{color:'var(--text-secondary)'}}>{place.feature}</p><a href={place.map} rel="noopener noreferrer" target="_blank" className="inline-flex rounded-full px-6 py-3 text-white font-medium" style={{background:'var(--accent)'}}>View exact location on Google Maps ↗</a></div><figure><Image src={`/nearby/${slug}.jpg`} width={960} height={640} alt={`Coastal scenery associated with ${place.name}, Lagos`} className="rounded-2xl w-full h-auto object-cover"/><figcaption className="text-xs mt-2" style={{color:'var(--text-muted)'}}>Real photograph of the named site or its surrounding Ponta da Piedade coastline; some small named features are not identifiable in this wider view. Source: Wikimedia Commons.</figcaption></figure></div>
    <section className="mb-14"><h2 className="font-display text-2xl font-semibold mb-5">At a glance</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[['Type',place.category],['Area','Lagos, Algarve, Portugal'],['Suggested stop','15–30 minutes plus walking time'],['Access','Follow current local signs']].map(([k,v])=><div key={k} className="p-5 rounded-xl" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}><p className="text-sm mb-2" style={{color:'var(--text-muted)'}}>{k}</p><p className="font-semibold">{v}</p></div>)}</div></section>
    <div className="max-w-3xl space-y-10">{sections.map(s=><section key={s.heading}><h2 className="font-display text-2xl font-semibold mb-3">{s.heading}</h2><p className="leading-relaxed whitespace-pre-line" style={{color:'var(--text-secondary)'}}>{s.text}</p></section>)}
    <section><h2 className="font-display text-2xl font-semibold mb-4">Frequently asked questions</h2><div className="space-y-4">{faq.map(([q,a])=><div key={q} className="rounded-xl p-5" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}><h3 className="font-semibold mb-2">{q}</h3><p className="leading-relaxed" style={{color:'var(--text-secondary)'}}>{a}</p></div>)}</div></section>
    <section><h2 className="font-display text-2xl font-semibold mb-3">Location and navigation</h2><p className="mb-4" style={{color:'var(--text-secondary)'}}>{place.setting} Open the dedicated place listing to check the best current approach; this is not a shared generic map link.</p><a className="font-semibold underline" style={{color:'var(--accent)'}} href={place.map} target="_blank" rel="noopener noreferrer">Google Maps: {place.name} ↗</a></section></div>
    <section className="mt-16"><h2 className="font-display text-2xl font-semibold mb-5">Continue exploring nearby</h2><div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{related.map(p=><a key={p.slug} href={`/en/nearby/${p.slug}`} className="rounded-xl p-5 hover:shadow-md" style={{background:'var(--card-bg)',border:'1px solid var(--border-color)'}}><strong style={{color:'var(--accent)'}}>{p.name}</strong><p className="text-sm mt-2" style={{color:'var(--text-secondary)'}}>{p.category}</p></a>)}</div></section>
    </main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(attractionLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbLd)}}/></>;
}
