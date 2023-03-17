import { ErrorMessage, Field, Form, Formik } from 'formik'
import Button from '../components/buttons/Button'
import CheckBox from '../components/sub-components/CheckBox'
import signUpSchema from '../utils/schemas/signUpSchema'
import { useContext, useState } from 'react'
import { RememberMeContext, AuthContext } from '../contexts/AuthProvider'
import useAxios from '../hooks/useAxios'
import axios from 'axios'

export default function SignUp({ setIsOpen }) {
	const { setAuth } = useContext(AuthContext)
	const { rememberMe, setRememberMe } = useContext(RememberMeContext)
	const [tokenLoading, setTokenLoading] = useState(false)
	const { postData, loading, error } = useAxios('users', true, false, true)

	async function handleSubmit(values) {
		const { firstName, lastName, username, password, month, year } = values

		const date = new Date()
		const currentMonth = date.getMonth()
		const currentYear = date.getFullYear()

		try {
			await postData({
				username,
				firstname: firstName,
				lastname: lastName,
				password,
				age:
					currentMonth > month - 1
						? currentYear - year
						: currentYear - year - 1,
				role: 'default',
			})

			setTokenLoading(true)

			try {
				const response = await axios.post(
					`${import.meta.env.VITE_AUTH_URL}token`,
					{ username, password }
				)

				setAuth(response.data)

				setIsOpen(false)
			} catch (error) {
				console.log(error)
			} finally {
				setTokenLoading(false)
			}
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<h1 className='text-[48px] text-elevated'>Opret profil</h1>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					username: '',
					password: '',
					month: '',
					year: '',
				}}
				validationSchema={signUpSchema}
				onSubmit={values => handleSubmit(values)}
			>
				<Form className='flex flex-col gap-4'>
					<div>
						<div className='flex gap-4'>
							<Input name='firstName' placeholder='Dit fornavn' />
							<Input name='lastName' placeholder='Dit efternavn' />
						</div>
						<div className='flex flex-col'>
							<Error name='firstName' />
							<Error name='lastName' />
						</div>
					</div>
					<div>
						<Input name='username' placeholder='Opret et brugernavn' />
						<Error name='username' />
					</div>
					<div>
						<Input
							name='password'
							type='password'
							placeholder='Opret en kode'
						/>
						<Error name='password' />
					</div>
					<div>
						<div className='flex gap-4'>
							<Input name='month' placeholder='Fødelsmåned' />
							<Input name='year' placeholder='Fødselsår' />
						</div>
						<div className='flex flex-col'>
							<Error name='month' />
							<Error name='year' />
						</div>
					</div>
					<CheckBox
						label='Husk mig'
						value={rememberMe}
						setValue={setRememberMe}
					/>
					<Button
						type='submit'
						additionalClass='mx-auto mt-4'
						loading={loading || tokenLoading}
					>
						Opret profil
					</Button>
				</Form>
			</Formik>
		</>
	)
}

function Error(props) {
	return (
		<ErrorMessage {...props} component='span' className='px-5 text-elevated' />
	)
}

function Input(props) {
	return (
		<Field
			{...props}
			className='flex flex-grow py-3 px-5 items-center gap-2  border-2 border-transparent focus:border-primary focus:outline-none transition pr-3 bg-elevated w-full'
		/>
	)
}
