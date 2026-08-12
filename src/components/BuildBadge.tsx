export default function BuildBadge() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 8,
        right: 12,
        zIndex: 50,
        fontFamily: 'system-ui',
        fontSize: 11,
        color: 'color-mix(in srgb, var(--hero-text) 55%, transparent)',
        pointerEvents: 'none',
      }}
    >
      build {__BUILD_SHA__}
    </div>
  )
}
