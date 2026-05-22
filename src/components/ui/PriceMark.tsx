interface PriceMarkProps {
  n?: number
}

export function PriceMark({ n = 1 }: PriceMarkProps) {
  return (
    <span className="mono" style={{ color: 'var(--muted)', textTransform: 'none', letterSpacing: '.04em', fontSize: 11 }}>
      <span style={{ color: 'var(--text)' }}>{'฿'.repeat(n)}</span>
      <span style={{ color: 'var(--line-2)' }}>{'฿'.repeat(4 - n)}</span>
    </span>
  )
}
