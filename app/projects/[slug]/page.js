import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectSlugs, projectCatalog } from "../../data/projects";
import ProjectDetailClient from "./project-detail-client";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

function localize(locale, value) {
  if (typeof value === "string") {
    return value;
  }
  return value?.[locale] ?? value?.en ?? "";
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    return {
      title: "Project Not Found"
    };
  }

  const title = `${localize("en", project.title)} | Jiajia Zhang`;
  const description = localize("en", project.summary);

  return {
    title,
    description,
    alternates: {
      canonical: `/projects/${project.slug}/`
    },
    openGraph: {
      title,
      description,
      url: `/projects/${project.slug}/`,
      type: "article"
    }
  };
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = projectCatalog
    .filter((candidate) => candidate.slug !== project.slug)
    .filter((candidate) => candidate.category === project.category || candidate.featured)
    .slice(0, 3);

  return (
    <Suspense fallback={null}>
      <ProjectDetailClient project={project} relatedProjects={relatedProjects} />
    </Suspense>
  );
}
