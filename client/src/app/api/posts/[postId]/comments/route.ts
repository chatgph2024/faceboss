import { validateRequest } from '@/auth'
import { prisma } from '@/lib'
import { type CommentsPage, getCommentDataInclude } from '@/types'
import { NextRequest } from 'next/server'

export const GET = async (
	req: NextRequest, //
	{ params }: { params: Promise<{ postId: string }> }) => {
	try {
		const { postId } = await params
		const cursor = req.nextUrl.searchParams.get('cursor') || undefined
		const pageSize = 5
		const { user } = await validateRequest()

		if (!user) {
			return Response.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const comments = await prisma.comment.findMany({
			where: { postId },
			include: getCommentDataInclude(user.id),
			orderBy: { createdAt: 'asc' },
			take: -pageSize - 1,
			cursor: cursor ? { id: cursor } : undefined
		})

		const data: CommentsPage = {
			comments: comments.length > pageSize ? comments.slice(1) : comments,
			previousCursor: comments.length > pageSize ? comments[0].id : null
		}
		return Response.json(data)
	} catch (error) {
		console.error(error)
		return Response.json({ error: 'Internal server error' }, { status: 500 })
	}
}
