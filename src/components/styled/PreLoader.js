import React from 'react'
import styled from 'styled-components'
import styles from '/const/styles'

export default function PreLoader() {
    return (
      <Container>
        <img src="/static/image/loading.gif" width="22" height="22" />
      </Container>
    )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: ${styles.color.background1}
`