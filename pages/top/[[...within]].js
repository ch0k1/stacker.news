import Layout from '../../components/layout'
import Items from '../../components/items'
import { useRouter } from 'next/router'
import { getGetServerSideProps } from '../../api/ssrApollo'
import { MORE_ITEMS } from '../../fragments/items'
import { Nav, Navbar } from 'react-bootstrap'
import styles from '../../components/header.module.css'
import Link from 'next/link'

export const getServerSideProps = getGetServerSideProps(MORE_ITEMS, { sort: 'top'})

export default function Index ({ data: { moreItems: { items, cursor } } }) {
  const router = useRouter()
  const path = router.asPath.split('?')[0]

  return (
    <Layout>
      <Navbar className='pt-0'>
        <Nav
          className={styles.navbarNav}
          activeKey={path}
        >
          <Nav.Item>
            <Link href='/top/day' passHref>
              <Nav.Link
                className={styles.navLink}
                onClick={() => localStorage.setItem('topWithin', 'day')}>
                day
              </Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/top/week' passHref>
              <Nav.Link
                className={styles.navLink}
                onClick={() => localStorage.setItem('topWithin', 'week')}>
                week
              </Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/top/month' passHref>
              <Nav.Link
                className={styles.navLink}
                onClick={() => localStorage.setItem('topWithin', 'month')}>
                month
              </Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/top/year' passHref>
              <Nav.Link
                className={styles.navLink}
                onClick={() => localStorage.setItem('topWithin', 'year')}>
                year
              </Nav.Link>
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link href='/top' passHref>
              <Nav.Link
                className={styles.navLink}
                onClick={() => localStorage.removeItem('topWithin')}>
                forever
              </Nav.Link>
            </Link>
          </Nav.Item>
        </Nav>
      </Navbar>
      <Items
        items={items} cursor={cursor}
        variables={{ sort: 'top', within: router.query?.within }} rank
      />
    </Layout>
  )
}