import { Card, Tag, Typography } from 'antd'
import { Link, useSearchParams } from 'react-router-dom'
import type { ExtendDirectoryAppInfo, RepositoryInfo } from '../types/extend'
import styles from './ExtendDirectoryItems.module.css'

const { Text } = Typography

const getRepositoriesTotal = (repositories?: RepositoryInfo[]) => {
  if (!repositories || repositories.length === 0) {
    return ''
  }
  return ` • ${repositories.length} ${repositories.length > 1 ? 'repositories' : 'repository'}`
}

const RepositoryLanguages = ({ repositories }: { repositories?: RepositoryInfo[] }) => {
  if (!repositories || repositories.length === 0) return null

  const languages = Array.from(new Set(repositories.map(r => r.language)))

  return (
    <ul className={`d-flex ${styles.itemTags}`}>
      {languages.map(language => (
        <li key={language}>
          <Tag>{language}</Tag>
        </li>
      ))}
    </ul>
  )
}

const ExtendDirectoryItem = ({ id, imageUrl, title, creator, repositories, description }: ExtendDirectoryAppInfo) => {
  const [searchParams] = useSearchParams()
  const newSearchParams = new URLSearchParams(searchParams)
  newSearchParams.set('appId', id)

  const isComingSoon = !repositories || repositories.length === 0

  return (
    <li>
      <ConditionalLink isComingSoon={isComingSoon} to={`?${newSearchParams.toString()}`}>
        <Card
          hoverable
          styles={{
            body: {
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              height: '100%'
            }
          }}
          className={styles.extendItem}
          style={{ position: 'relative', overflow: 'hidden', cursor: isComingSoon ? 'default' : 'pointer' }}
        >
          {isComingSoon && (
            <Tag
              color="purple"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                margin: 0,
                borderRadius: '0px 8px 0px 4px',
                zIndex: 1
              }}
            >
              Coming Soon
            </Tag>
          )}
          <div className={`d-flex align-items-center ${styles.itemBody}`}>
            <img src={imageUrl} width={64} height={64} className={styles.itemImage} alt={title} />
            <div className="d-flex flex-column">
              <Text strong>{title}</Text>
              <Text style={{ color: '#000000A6' }}>
                by {creator}
                {getRepositoriesTotal(repositories)}
              </Text>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-between h-100" style={{ gap: 16 }}>
            <Text style={{ color: '#000000A6' }}>{description}</Text>
            <RepositoryLanguages repositories={repositories} />
          </div>
        </Card>
      </ConditionalLink>
    </li>
  )
}

export const ExtendDirectoryItems = ({ data }: { data: ExtendDirectoryAppInfo[] }) => {
  return (
    <ul className={styles.extendDir}>
      {data.map(item => (
        <ExtendDirectoryItem {...item} key={item.id} />
      ))}
    </ul>
  )
}

interface ConditionalLinkProps {
  isComingSoon: boolean
  to: string
  children: React.ReactNode
}

const ConditionalLink = ({ isComingSoon, to, children }: ConditionalLinkProps) => {
  if (isComingSoon) {
    return <>{children}</>
  }

  return (
    <Link to={to} preventScrollReset>
      {children}
    </Link>
  )
}
