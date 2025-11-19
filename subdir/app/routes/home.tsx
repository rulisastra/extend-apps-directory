import { Select, Typography } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { ExtendDirectoryDetailModal } from '~/components/ExtendDirectoryDetailModal'
import accelByteLogo from '../assets/accelbyte.svg'
import { ExtendDirectoryItems } from '../components/ExtendDirectoryItems'
import extendAppsJson from '../data/extend-apps-directory.json'
import { type ExtendDirectoryAppInfo, FilterDevelopedBy } from '../types/extend'
import styles from './home.module.css'

const { Title, Text } = Typography

export function meta() {
  return [
    { title: 'Extend Apps Directory' },
    { name: 'description', content: 'Enhance your games with powerful Extend apps crafted by our community. ' }
  ]
}

const DEVELOPED_BY_OPTIONS = [
  { label: FilterDevelopedBy.All, value: FilterDevelopedBy.All },
  { label: FilterDevelopedBy.AccelByte, value: FilterDevelopedBy.AccelByte },
  { label: FilterDevelopedBy.External, value: FilterDevelopedBy.External }
]

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const developedBy = searchParams.get('developedBy') as FilterDevelopedBy | null

  const extendApps =
    developedBy && developedBy !== FilterDevelopedBy.All
      ? extendAppsJson.filter((e) => {
          if (developedBy === FilterDevelopedBy.External) {
            return e.creator !== FilterDevelopedBy.AccelByte
          }
          return e.creator === developedBy
        })
      : extendAppsJson

  const handleDevelopedByChange = (option: FilterDevelopedBy) => {
    if (option === FilterDevelopedBy.All) {
      searchParams.delete('developedBy')
    } else {
      searchParams.set('developedBy', option)
    }
    setSearchParams(searchParams)
  }

  return (
    <>
      <header className={styles.header}>
        <img src={accelByteLogo} height={32} alt="AccelByte Logo" />
      </header>
      <main className="d-flex align-items-center flex-column">
        <div className={`d-flex flex-column ${styles.main}`}>
          <div>
            <Title className={styles.title} level={3}>
              Extend Apps Directory
            </Title>
            <Text className={styles.title}>Enhance your games with powerful Extend apps crafted by our community.</Text>
          </div>
          <div>
            <Select
              prefix="Developed by:"
              value={developedBy || FilterDevelopedBy.All}
              onChange={handleDevelopedByChange}
              options={DEVELOPED_BY_OPTIONS}
            />
          </div>
          <ExtendDirectoryItems data={extendApps as ExtendDirectoryAppInfo[]} />
        </div>
      </main>
      <ExtendDirectoryDetailModal />
    </>
  )
}
