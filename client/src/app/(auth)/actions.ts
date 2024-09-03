'use server'

import { lucia, validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const logOut = async (): Promise<{ error: string }> => {
	const { session } = await validateRequest()
	if (!session) {
		throw new Error('Unauthorized: You are not logged in')
	}

	await lucia.invalidateSession(session.id)
	const { name, value, attributes } = lucia.createBlankSessionCookie()
	cookies().set(name, value, attributes)

	return redirect('/login')
}
