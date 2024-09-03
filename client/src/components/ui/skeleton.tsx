import { cn } from '@/lib/utils'

const Skeleton = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn('bg-muted animate-pulse rounded-md', className)} {...props} />
}

export { Skeleton }
