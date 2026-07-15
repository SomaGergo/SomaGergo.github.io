import type { ReactNode } from 'react'

type MarkdownRendererProps = {
  content: string
}

function renderInline(text: string): ReactNode[] {
  const tokens = /(\[[^\]]+\]\([^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g
  const parts = text.split(tokens).filter(Boolean)

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded bg-background/80 px-1.5 py-0.5 font-mono text-[0.95em] text-primary"
        >
          {part.slice(1, -1)}
        </code>
      )
    }

    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-primary underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary/80"
        >
          {label}
        </a>
      )
    }

    return <span key={index}>{part}</span>
  })
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim())
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const lines = content.split(/\r?\n/)
  const blocks: ReactNode[] = []
  let index = 0

  while (index < lines.length) {
    const line = lines[index].trim()

    if (!line) {
      index += 1
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2]
      const className =
        level === 1
          ? 'text-4xl font-bold tracking-tight text-foreground'
          : level === 2
            ? 'text-2xl font-semibold text-foreground'
            : 'text-xl font-semibold text-foreground'
      const Tag = `h${Math.min(level, 6)}` as keyof JSX.IntrinsicElements

      blocks.push(
        <Tag key={`heading-${index}`} className={className}>
          {renderInline(text)}
        </Tag>
      )
      index += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quoteLines: string[] = []
      while (index < lines.length && lines[index].trim().startsWith('> ')) {
        quoteLines.push(lines[index].trim().slice(2))
        index += 1
      }

      blocks.push(
        <blockquote
          key={`quote-${index}`}
          className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4 text-sm text-muted-foreground"
        >
          {quoteLines.map((quoteLine, quoteIndex) => (
            <p key={quoteIndex}>{renderInline(quoteLine)}</p>
          ))}
        </blockquote>
      )
      continue
    }

    if (line.startsWith('```')) {
      const codeLines: string[] = []
      index += 1
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index])
        index += 1
      }
      index += 1

      blocks.push(
        <pre
          key={`code-${index}`}
          className="overflow-x-auto rounded-2xl border border-border/60 bg-black/30 p-4 text-sm text-foreground"
        >
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
      continue
    }

    const isTable =
      line.includes('|') &&
      index + 1 < lines.length &&
      /^[:|\-\s]+$/.test(lines[index + 1].trim())

    if (isTable) {
      const headers = parseTableRow(lines[index])
      index += 2
      const rows: string[][] = []

      while (index < lines.length && lines[index].trim().includes('|')) {
        rows.push(parseTableRow(lines[index]))
        index += 1
      }

      blocks.push(
        <div key={`table-${index}`} className="overflow-x-auto rounded-2xl border border-border/60">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-card/80">
              <tr>
                {headers.map((header, headerIndex) => (
                  <th key={headerIndex} className="border-b border-border/60 px-4 py-3 font-semibold text-foreground">
                    {renderInline(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-card/30">
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className="border-t border-border/40 px-4 py-3 text-muted-foreground">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (/^-\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^-\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^-\s+/, ''))
        index += 1
      }

      blocks.push(
        <ul key={`ul-${index}`} className="space-y-3 pl-6 text-muted-foreground">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="list-disc marker:text-primary">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ''))
        index += 1
      }

      blocks.push(
        <ol key={`ol-${index}`} className="space-y-3 pl-6 text-muted-foreground">
          {items.map((item, itemIndex) => (
            <li key={itemIndex} className="list-decimal marker:text-primary">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    const paragraphLines: string[] = []
    while (
      index < lines.length &&
      lines[index].trim() &&
      !/^(#{1,6})\s+/.test(lines[index].trim()) &&
      !lines[index].trim().startsWith('> ') &&
      !lines[index].trim().startsWith('```') &&
      !/^-+\s*/.test(lines[index].trim()) &&
      !/^\d+\.\s+/.test(lines[index].trim()) &&
      !(
        lines[index].trim().includes('|') &&
        index + 1 < lines.length &&
        /^[:|\-\s]+$/.test(lines[index + 1].trim())
      )
    ) {
      paragraphLines.push(lines[index].trim())
      index += 1
    }

    blocks.push(
      <p key={`p-${index}`} className="text-base leading-8 text-muted-foreground">
        {renderInline(paragraphLines.join(' '))}
      </p>
    )
  }

  return <div className="space-y-6">{blocks}</div>
}
