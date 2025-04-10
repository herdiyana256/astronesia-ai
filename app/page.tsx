import { ZodiakApp } from "@/components/zodiak-app"
import ErrorBoundary from "@/components/error-boundary"

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="min-h-screen">
        <ZodiakApp />
      </main>
    </ErrorBoundary>
  )
}
