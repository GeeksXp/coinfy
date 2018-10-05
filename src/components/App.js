import React, { Component } from 'react'
import styled from 'styled-components'
import styles from '/const/styles'
import Popups from '/components/partials/Popups'
import Notifications from '/components/partials/Notifications'
import Header from '/components/partials/Header'
import SideMenu from '/components/partials/SideMenu'
import Views from '/components/partials/Views'
import Footer from '/components/partials/Footer'
import SignIn from '/components/views/SignIn'
import state from '../store/state'
import { createObserver } from 'dop'
import { isAuth } from '/helpers/auth'
import { getAssetsFromStorage } from '/store/getters'
import PreLoader from '/components/styled/PreLoader'
import Div from '/components/styled/Div'

function show() {
    let scanner = new Instascan.Scanner({
        video: document.getElementById('cam')
    })
    scanner.addListener('scan', function(content) {
        console.log(content)
    })
    Instascan.Camera.getCameras()
        .then(function(cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0])
            } else {
                console.error('No cameras found.')
            }
        })
        .catch(function(e) {
            console.error(e)
        })
}

function signInView() {
    return (
        <Background>
            <Notifications />
            <Header />
            <SignIn />
        </Background>
    )
}

function mainView() {
    return (
        <Background>
            <Notifications />
            <SideMenu />
            <Header />
            <Views />
            <Footer />
            <Popups />
        </Background>
    )
}

export default class App extends Component {
    componentWillMount() {
        isAuth()
        this.observer = createObserver(mutations => {
            state.assets = getAssetsFromStorage()
            this.forceUpdate()
        })
        this.observer.observe(state, 'isLoggedIn')
        this.observer.observe(state, 'loading')
    }

    componentWillUnmount() {
        this.observer.destroy()
    }

    shouldComponentUpdate() {
        return false
    }

    render() {
        const Layout = state.isLoggedIn ? mainView() : signInView()
        return (
            <Div height="100%">
                { state.loading ? <PreLoader /> : Layout }
            </Div>
        )
    }
}

const Background = styled.div`
    height: 100%;
    background: linear-gradient(to bottom, #007196 150px, #d7dbd5 150px);
`