import glob from 'fast-glob'
import * as path from 'path'

async function importAdventure(adventureFilename) {
  let { meta, default: component } = await import(
    `../pages/adventures/${adventureFilename}`
  )
  return {
    slug: adventureFilename.replace(/(\/index)?\.mdx$/, ''),
    meta, // Keep the meta properties nested under the meta key
    component,
  }
}

export async function getAllAdventures() {
  let adventureFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/adventures'),
  })

  let adventures = await Promise.all(adventureFilenames.map(importAdventure))

  return adventures.sort((a, z) => new Date(z.date) - new Date(a.date))
}
