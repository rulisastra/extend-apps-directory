import { CloseOutlined } from '@ant-design/icons'
import { Badge, Button, Card, Modal, Tag, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import type { ExtendDirectoryAppInfo, RepositoryInfo } from '~/types/extend'
import { Language, mapLanguageToColor, mapRepositoryTypeToText } from '~/types/extend'
import extendApps from '../data/extend-apps-directory.json'
import styles from './ExtendDirectoryDetailModal.module.css'
import { ExternalLink } from './ExternalLink'
import type { ReactNode } from 'react'

const { Title, Text, Paragraph } = Typography

const Repository = ({ index: isIndexRepository, title, description, url, language, type, appRecommendedResource }: RepositoryInfo) => {
  const rawElements = [
    type ? <Tag className={styles.repositoryMeta}>{mapRepositoryTypeToText[type]}</Tag> : isIndexRepository ? <Tag>Primary</Tag> : null,
    <span>
      <Badge dot color={mapLanguageToColor[language as Language]} /> {language}
    </span>,
    appRecommendedResource && (
      <>
        <div>Memory: {appRecommendedResource.memory}</div>• <div>CPU: {appRecommendedResource.cpu}</div>
      </>
    )
  ].filter(Boolean)
  const elements: ReactNode[] = []

  rawElements.forEach((element, i) => {
    if (!element) return
    elements.push(element)

    if (i + 1 < rawElements.length) {
      elements.push('•')
    }
  })

  return (
    <Card classNames={{ body: styles.repositoryCardBody }}>
      <div>
        <div>
          <Text strong>{title}</Text>
          <Paragraph style={{ color: '#000000A6' }}>{description}</Paragraph>
        </div>
        <div className={styles.repositoryDetails}>{elements}</div>
      </div>
      <Button href={url} target="_blank">
        View <ExternalLink />
      </Button>
    </Card>
  )
}

export function ExtendDirectoryDetailModal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const appId = searchParams.get('appId')
  const extendApp = extendApps.find(app => app.id === appId) as ExtendDirectoryAppInfo

  if (!extendApp) return null

  const isComingSoon = !extendApp.repositories || extendApp.repositories.length === 0

  const handleCancel = () => {
    searchParams.delete('appId')
    setSearchParams(searchParams, { preventScrollReset: true })
  }

  return (
    <Modal
      open
      className={styles.modal}
      styles={{ content: { padding: 0 } }}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
      onCancel={handleCancel}
      style={{ position: 'relative', overflow: 'hidden' }}
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
      <div className={`d-flex align-items-center justify-content-between ${styles.modalHeader}`}>
        <div className="d-flex align-items-center" style={{ gap: 12 }}>
          <img src={extendApp.imageUrl} width={64} height={64} style={{ borderRadius: 8, objectFit: 'cover' }} alt={extendApp.title} />
          <div className="d-flex flex-column">
            <Title level={3} className={styles.modalTitle}>
              {extendApp.title}
            </Title>
            <Text style={{ color: '#000000A6' }}>by {extendApp.creator}</Text>
          </div>
        </div>
        <Button style={{ width: 32, height: 32 }} onClick={handleCancel}>
          <CloseOutlined />
        </Button>
      </div>
      <div className={styles.modalContent}>
        <div>
          <Title level={5}>Description</Title>
          <Paragraph style={{ color: '#000000A6' }}>{extendApp.description}</Paragraph>
        </div>
        {!isComingSoon && (
          <div>
            <Title level={5}>Repositories</Title>
            <ul className={styles.repositories}>
              {extendApp.repositories?.map(r => (
                <Repository {...r} key={r.url} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  )
}
