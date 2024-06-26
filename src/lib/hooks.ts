'use client'

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const matchQueryList = window.matchMedia(query)
    function handleChange(e: any) {
      setMatches(e.matches)
    }
    matchQueryList.addEventListener('change', handleChange)

    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query])

  return matches
}
