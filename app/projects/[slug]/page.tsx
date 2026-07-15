import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'

import { MarkdownRenderer } from '@/components/markdown-renderer'
import { getProjectContent } from '@/lib/project-content'
import { getProjectBySlug, getPublishedProjects } from '@/lib/projects'

type ProjectPageProps = {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return getPublishedProjects().map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Soma Gergo`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const entry = await getProjectContent(slug)

  if (!entry) {
    notFound()
  }

  const { project, content } = entry

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-10 md:px-8 md:py-16">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <section className="mt-10 rounded-[2rem] border border-border/60 bg-card/70 p-8 shadow-2xl shadow-primary/5 backdrop-blur-sm md:p-12">
          <div className="mb-10 space-y-5 border-b border-border/60 pb-8">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                {project.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                {project.description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {Object.entries(project.metrics).map(([key, value]) => (
                <div key={key} className="rounded-2xl border border-border/50 bg-background/60 p-4">
                  <div className="text-2xl font-bold text-primary">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    {key}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <MarkdownRenderer content={content} />
        </section>

        <div className="mt-8">
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Want this kind of work on your team?
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  )
}
