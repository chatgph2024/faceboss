"use client"

import { PostData } from '@/types'
import { useDeletePostMutation } from './mutations'
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog'
import LoadingButton from '../LoadingButton'
import { Button } from '../ui/button'

interface DeletePostDialogProps {
	post: PostData
	open: boolean
	onClose: () => void
}

const DeletePostDialog = ({ post, open, onClose }: DeletePostDialogProps) => {
	const mutation = useDeletePostMutation()
	const handleOpenChange = (open: boolean) => {
		if (!open || mutation.isPending) {
			onClose()
		}
	}
	return (
		<Dialog open={open} onOpenChange={handleOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete post?</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this post? This action can't be undone.
					</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <LoadingButton variant="destructive" onClick={() => mutation.mutate(post.id, {onSuccess: onClose})} loading={mutation.isPending}>Delete</LoadingButton>
                    <Button variant="outline" onClick={onClose} disabled={mutation.isPending}>Cancel</Button>
                </DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

DeletePostDialog.displayName = 'DeletePostDialog'

export default DeletePostDialog
