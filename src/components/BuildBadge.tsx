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
        color: 'rgba(90, 68, 44, 0.55)',
        pointerEvents: 'none',
      }}
    >
      build {__BUILD_SHA__}
    </div>
  )
}
