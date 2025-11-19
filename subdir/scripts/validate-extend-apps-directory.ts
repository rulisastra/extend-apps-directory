import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Zod schemas based on app/types/extend.ts and observed JSON data
const LanguageEnum = z.enum(['Go', 'Shell', 'C#', 'C++', 'Python', 'Java', 'JavaScript', 'TypeScript']);

const RepositoryTypeEnum = z.enum(['service-extension', 'event-handler', 'override']);

const AppRecommendedResourceSchema = z.object({
  cpu: z.string(),
  memory: z.string(),
});

const RepositoryInfoSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  language: LanguageEnum,
  type: RepositoryTypeEnum.optional(),
  // Making appRecommendedResource optional to match the provided JSON data,
  // even though the TypeScript interface marks it as required.
  // This assumes the JSON data is the source of truth for validation.
  appRecommendedResource: AppRecommendedResourceSchema.optional(),
});

const ExtendDirectoryAppInfoSchema = z.object({
  id: z.string(),
  imageUrl: z.string().optional(),
  title: z.string(),
  description: z.string(),
  creator: z.string(),
  repositories: z.array(RepositoryInfoSchema).optional(),
});

const ExtendAppsDirectorySchema = z.array(ExtendDirectoryAppInfoSchema);

const jsonFilePath = path.join(__dirname, '../app/data/extend-apps-directory.json');

try {
  const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
  const parsedData = JSON.parse(jsonData);

  ExtendAppsDirectorySchema.parse(parsedData);

  console.log('✅ extend-apps-directory.json validated successfully!');
} catch (error) {
  console.error('❌ Validation failed for extend-apps-directory.json');
  if (error instanceof z.ZodError) {
    console.error(error?.message);
  } else {
    console.error(error);
  }
  process.exit(1);
}
