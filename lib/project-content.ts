import 'server-only'

import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { getProjectBySlug } from '@/lib/projects'

export async function getProjectContent(slug: string) {
  const project = getProjectBySlug(slug)

  if (!project?.contentFile) {
    return null
  }

  const filePath = path.join(process.cwd(), 'content', 'projects', project.contentFile)
  const content = await readFile(filePath, 'utf8')

  return {
    project,
    content,
  }
}
