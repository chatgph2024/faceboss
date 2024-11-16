'use client'

import { CommentData } from '@/types'
import { useDeleteCommentMutation } from '@/hooks'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import { LoadingButton } from '@/components'
import { Button } from '../ui/button'

interface DeleteCommentDialogProps {
	comment: CommentData
	open: boolean
	onClose: () => void
}

const DeleteCommentDialog = ({ comment, open, onClose }: DeleteCommentDialogProps) => {
	const mutation = useDeleteCommentMutation()

	const handleOpenChange = (open: boolean) => {
		if (!open || mutation.isPending) {
			onClose()
		}
	}

	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete comment?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this comment? This action can't be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<LoadingButton
						variant="destructive"
						onClick={() => mutation.mutate(comment.id, { onSuccess: onClose })}
						loading={mutation.isPending}
					>
						Delete
					</LoadingButton>
					<Button variant="outline" onClick={onClose} disabled={mutation.isPending}>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

DeleteCommentDialog.displayName = 'DeleteCommentDialog'

export default DeleteCommentDialog
