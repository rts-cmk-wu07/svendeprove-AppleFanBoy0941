import * as Yup from 'yup'

const date = new Date()
const year = date.getFullYear()

const signUpSchema = Yup.object().shape({
	firstName: Yup.string().required('Indtast venligst dit fornavn'),
	lastName: Yup.string().required('Indtast venligst dit efternavn'),
	username: Yup.string().required('Indtast venligst et brugernavn'),
	password: Yup.string()
		.required('Indtast venligst et kodeord')
		.min(4, 'Koden sal være på mindst 4 karakterer'),
	month: Yup.number()
		.min(1, 'Indtast venligst en gyldig måned')
		.max(12, 'Indtast venligst en gyldig måned')
		.required('Indtast venligst en måned'),
	year: Yup.number()
		.min(1900, 'Indtast venligst et gyldigt årstal')
		.max(year - 10, 'Du skal være mindst 10 år')
		.required('Indtast venligst et årstal'),
})

export default signUpSchema
