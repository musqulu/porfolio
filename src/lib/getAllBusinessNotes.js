import glob from 'fast-glob'
import * as path from 'path'

async function importBusinessNote(noteFilename) {
  let { meta, default: component } = await import(
    `../pages/business-notes/${noteFilename}`
  )

  return {
    slug: noteFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllBusinessNotes() {
  let noteFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/business-notes'),
  })

  let notes = await Promise.all(noteFilenames.map(importBusinessNote))

  return notes.sort((a, z) => new Date(z.date) - new Date(a.date))
}
