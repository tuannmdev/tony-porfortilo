export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="border-2 border-border-retro bg-panel-retro p-8 shadow-retro-card">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 animate-spin border-4 border-primary border-r-transparent" />
            <div className="space-y-2">
              <p className="text-xl font-bold text-primary uppercase">
                LOADING...
              </p>
              <div className="flex space-x-1">
                <div
                  className="h-2 w-2 bg-primary animate-pulse"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="h-2 w-2 bg-primary animate-pulse"
                  style={{ animationDelay: "200ms" }}
                />
                <div
                  className="h-2 w-2 bg-primary animate-pulse"
                  style={{ animationDelay: "400ms" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
