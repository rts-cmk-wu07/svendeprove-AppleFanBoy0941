# Svendeprøve – Landrup Dans

**Elev:** Sebastian L. Nielsen  
**Hold:** WU07  
**Uddannelse:** Webudvikler

## Indholdsfortegnelse

- [Tech Stack](#tech-stack)
- [Overvejelser og Valg](#overvejelser-og-valg)
- [Arbejdsgang](#arbejdsgang)
- [Skalering](#fremtidens-landrup-dans)
- [Kodeeksempler](#kodeeksempler)

# Tech Stack

Til min svendeprøve har jeg valgt følgende stack:

- [React](#react)
- [Axios](#axios)
- [Framer Motion](#framer-motion)
- [Lucide Icons](#lucide-icons)
- [TailwindCSS](#tailwindcss)
- [React Router Dom](#react-router-dom)
- [Formik](#formik)
- [Yup](#yup)
- [react-use](#react-use)

## React

React er et bibliotek, skabt til at lave SPA's. React giver en redskaber som hooks (`useState`, `useEffect` mm.) og komponenter. React giver en masse fleksibilitet, da det er unopininated.  
React har et stort community og gode docs, som gør det nemt at finde hjælp, når der opstår problemer, hvilket også er grunden til at jeg har valgt React over fx **Vue**, da min oplevelse med Vue, er at det er et forholdsvist nyt framework, og endnu ikke har et så stort community endnu. Det gør det svært at finde hjælp hvis man sidder fast.

## Axios

Axios er et lille bibliotek, der gør fetch-kald meget nemmere. Axios klarer gentagne ting for dig automatisk, så man skal ikke tænke på fx JSON eller backwards compatibility, hvilket er derfor jeg valgte at bruge Axios i stedet for at skrive mine fetch-kald selv. Jeg har brugt Axios meget før og deres docs er gode til at finde hjælp.

## Framer Motion

Framer Motion er et animations-bibliotek til React, det gør det nemt at animere elementer. Du kan lave helt simple animationer som du ville i CSS, men du kan også animere mere avancerede ting, som fx når et element bliver fjernet fra DOM'en.  
Jeg har valgt at bruge Framer Motion over andre animations-biblioteker som React Spring, da den kommer med det hele inkluderet og har indbygget gesture support, hvilket kræver ekstra pakker i React Spring. Selvom Framer Motions docs er langt fra er perfekte, er det stadig bedre end alternativerne og deres community er stort, så man kan altid få hjælp.

## Lucide Icons

Lucide Icons er en fork af Feather Icons så samlingen af ikoner er udvidet til ca. 800 ikoner. Da mock-uppen brugte Feather Icons gav det mening at bruge Lucide Icons, da jeg så nemt kunne tilføje mine egner ikoner, der matchede designet, til fx fejlbeskeder.

## TailwindCSS

TailwindCSS er et utility-first CSS framework, der gør det hurtigt og nemt at style ens komponenter og sørger samtidigt for at man får et overordnet og ensartet udtryk.  
I stedet for at skrive normal CSS kan man give ens elementer klasser som: `flex` for at give den `display: flex`.  
TailwindCSS giver en masse fleksibilitet og sørger samtidigt for at tilsætte prefixes hvor der er behov, så man ikke skal bekymre sig om cross browser support.  
Jeg valgte TailwindCSS over andre CSS frameworks, som **Bootstrap**, fordi det er så customizable. Du føler du skriver CSS, bare hurtigere, hvor Bootstrap og andre CSS frameworks typisk har en bestemt måde de gerne selv vil have det skal se ud. Derudover har TailwindCSS rigtig gode docs og et voksende community.

## React Router Dom

React Router Dom er et bibliotek til at navigere i din SPA. Pakken giver dig mange hooks , der hjælper dig til at navigere rundt i appen, fx med `<Link>`-komponentet eller `useNavigate`-hooket.  
Jeg har valgt at bruge React Router Dom fordi det er pakke med meget "erfaring" og den bliver stadig vedligeholdt og får regelmæssige opdateringer, samtidigt med den gør det nemt at opsætte ens navigation og kommer med alle de ting man har brug for mht. navigation i din SPA.

## Formik

Formik er et bibliotek der gør det nemmere at lave forme i React, den tager hånd om alle værdier og fejl for en. Formik er meget fleksibelt og man kan nemt lave sin form som man gerne selv vil have den og få den til at se ud som man ønsker.  
Jeg valgte at bruge Formik over fx React Hook Forms, pga. dens gode integration med [Yup](#yup) som gør det meget nemt at validere ens form. Derudover er Formik nemt at komme i gang med samtidigt med den giver dig alt det du har behov for. Formik har også rigtig gode docs.

## Yup

Yup er et validerings schema-bibliotek, der gør det nemt at validere din form ved at opsætte schemas for dine inputs.  
Jeg har valgt Yup over andre biblioteker, da Yup har en fremragende integration med Formik, der gør det meget nemt at komme i gang med. Desuden har Yup gode docs.

## react-use

react-use er et hook-bibliotek, der giver dig mange brugbare hooks til din app. Eksempler fra min prøve er fx `useEffectOnce` der fungerer som en useEffect, men den bliver kun kørt ved første render. Andre eksempler man kunne bruge er fx `useDropArea` og `useCopyToClipboard`.  
Jeg har valgt react-use over andre hook-biblioteker fordi det er det bibliotek med flest hooks og den havde de hooks jeg skulle bruge.

Selvom react-use har en `useCookie`-hook, har jeg dog valgt at bruge **`react-use-cookie`**, da den tilføjer muligheden for en default value og har bedre håndtering af cookien.

# Overvejelser og Valg

## Ændringer fra designet

- Tilføjede minimal hvid baggrund til "Landrup" på **Velkomst**-siden for at forbedre readability.
- Jeg har gjort navnet på en aktivitet i listevisning større, så de er mere scanbare.
- Hvis brugeren ikke er logget ind, men kommer ind på en aktivitet, vises knappen "Tilmeld" stadig, så brugeren kan forblive i flowet og ikke skal ud og lede efter log ind et andet sted.
- Hvis brugeren ikke er indenfor aldersgrænsen til en aktivitet, vil knappen minde dem om det og blive deaktiveret, så de ikke kan melde sig på.
- Hvis en instruktør går ind på sin egen aktivitet, bliver det vist og de får ikke mulighed for at melde sig på holdet.
- På **Kalender**-siden har hvert item i listen mindre padding og en mindre overskrift, dette giver mere plads og forbedrer scanbarheden.
- Overskrifter på hver side har fået fed skrift, så det er nemt at se hvilken side man er på. Skaber visuelt hieraki.
- Margener er blevet gjort ens, så siderne får rene linjer.
- I stedet for at alle links i draweren har en rund outline, har jeg valgt at det kun er den aktive side, der har en outline. Dette giver klarhed for brugeren over hvilken side de er på.
- Designet bruger to shades af en næsten ens grå. Jeg har valgt at gå med den grå farve fra style-guiden til det hele, da det kan skabe forvirring at have to grå farver der er så ens i designet.
- Holdoversigt har fået mere space, jeg har givet navnene på deltagerne et større gap, så vi udnytter pladsen vi har, og samtidigt bliver listen mere scanbar.

## Tilføjelser

- Hvis en bruger ikke er logget ind og går ind på kalender-visningen, vil de blive mindet om at de skal være logget ind for at kunne se deres kalender. Derudover har jeg tilføjet en log ind knap så brugeren nemt kan logge ind. Der er ikke nogen log ind-knap i designet, så derfor har jeg tilføjet knappen.
- Jeg har tilføjet en "Opret profil" mulighed for at tillade nye brugere. Jeg tænker det giver mening at en bruger har mulighed for at oprette en profil hvis de ikke allerede har en.
- Jeg har tilføjet små detaljer som en 404-side, info-beskeder hvis der er tomme sider (fx hvis man ikke har søgt på noget endnu på Søg-siden)
- Jeg har tilføjet en "Tilbage"-knap til aktivitets-detaljer-siden og på holdoversigt-siden, så brugeren nemt kan gå tilbage til den side de kom fra.

## Animationer

Jeg har brugt animationer mange steder i appen for at understøtte designet og for at skabe fokus om det vigtigste. Jeg har brugt animationer for at give brugeren feedback, fx når de klikker på knapper eller lign. Jeg har generelt haft som mål at holde animationerne naturlige, så ikke de virker overvældende for brugeren og tager for meget fokus.

# Arbejdsgang

Jeg har arbejdet hårdt hele ugen og har været fuldt fokuseret på opgaven. Første dag brugte jeg meget tid på at opsætte min [projektstyring](https://github.com/orgs/rts-cmk-wu07/projects/19/views/1) og det har hjulpet mig med at prioritere senere på ugen.  
Jeg prøvede at prioritere min tid, så jeg fulgte en brugers flow i appen. Derfor startede jeg fx med at lave en velkomst-side, bagefter gik jeg til aktivitetssiden osv.

# Fremtidens Landrup Dans

I fremtiden kan Landrup Dans udvide med nye funktioner til deres app. Man kunne fx tilføje muligheden for at filtrere aktiviteter efter aldersgrænse og type.  
Man kunne også integrere sociale features så man kan følge hinanden og se hvilke aktiviteter man går til.

Når Landrup dans vokser sig større og får flere brugere er det også vigtigt at sørge for at siden kører problemfrit. Det er fx vigtigt at hjemmesiden ligger på forskellige servere så den kan håndtere mange brugere samtidigt. Det kan fx være ved at opgradere til et højere plan på Netlify, der giver mulighed for det.

# Kodeeksempler

## Auth

Dette er min auth context. Der sker lidt forskellige ting i dette stykke. Fordi brugeren kan vælge at blive husket, tjekker jeg både efter en key i mine cookies og i sessionStorage. Jeg bruger så en `useEffectOnce` fra react-use for at sætte min context til enten min cookie eller "session".

I min useEffect tjekker jeg at hvis min context ændrer sig skal den opdatere min cookie eller sessionstorage. Dette sikrer at jeg altid har den helt opdaterede auth i min cookie eller sessionstorage. Hvis jeg til gengæld sætter min auth context til at have en `action`-key til at være 'delete', så ved jeg at den skal slettes og derfor logges ud.

```js
export const AuthContext = createContext()

export default function AuthProvider({ children }) {
	const [authCookie, setAuthCookie] = useCookie('auth')
	const [authSession, setAuthSession] = useSessionStorage('auth')
	const [rememberMe, setRememberMe] = useState(false)

	const [auth, setAuth] = useState({})

	useEffectOnce(() => {
		if (authCookie) {
			setAuth(JSON.parse(authCookie))
			setRememberMe(true)
		} else if (authSession) {
			setAuth(JSON.parse(authSession))
		}
	})

	useEffect(() => {
		if (auth.action === 'delete') {
			if (rememberMe) {
				setAuthCookie(null, { days: -1 })
			} else {
				setAuthSession(null)
			}
			setRememberMe(false)
			return
		}
		if (Object.keys(auth).length > 0) {
			if (rememberMe) {
				setAuthCookie(JSON.stringify(auth), {
					days: formatDateToDays(auth.validUntil),
				})
			} else {
				setAuthSession(JSON.stringify(auth))
			}
		}
	}, [auth])

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			<RememberMeContext.Provider value={{ rememberMe, setRememberMe }}>
				{children}
			</RememberMeContext.Provider>
		</AuthContext.Provider>
	)
}
```

## Filter funktion

Dette er funktionen jeg bruger til at filtrere aktiviteter, når man bruger søgefunktionen. Denne funktion vil jeg gerne forklare mere om til prøven.

```js
function filterClasses() {
	if (!filter || filter === '') return data
	if (!data || Object.keys(data).length < 1) return data

	const importance = {
		name: 3,
		description: 2,
		weekday: 1,
		time: 1,
		age: 2,
	}

	const filtered = data?.filter(item => {
		let score = 0
		Object.keys(importance).forEach(key => {
			if (key === 'time') {
				if (
					item.time.includes(filter) ||
					item.time.replace(':', '.').includes(filter) ||
					item.time.replace(':', '').includes(filter)
				) {
					score += importance[key]
				}
			} else if (key === 'age') {
				if (parseInt(filter) >= item.minAge && parseInt(filter) <= item.maxAge)
					score += importance[key]
			} else {
				if (item[key].toLowerCase().includes(filter)) {
					score += importance[key]
				}
			}
		})
		return score > 0
	})

	const sorted = filtered.sort((a, b) => a - b)

	return sorted
}
```
