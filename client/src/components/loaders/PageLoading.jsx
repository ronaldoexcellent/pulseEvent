export default function PageLoading() {
    return (
        <div className="flex h-screen items-center justify-center bg-pulse-bg-light">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pulse-purple-primary"></div>
        </div>
    )
}