// Designed by Ericarthurc
// https://github.com/Ericarthurc
// October 24, 2019
// Wildwood Tech

import React, { useState } from 'react';
import './Titlebar.css'

const ipcRenderer = window.require('electron').ipcRenderer

const Titlebar = () => {

    const [isActive, setIsActive] = useState()
    const [isMaximized, setIsMaximized] = useState()

    ipcRenderer.on('focused', () => {
        setIsActive(true)
    })

    ipcRenderer.on('blurred', () => {
        setIsActive(false)
    })

    ipcRenderer.on('maximized', () => {
        setIsMaximized(true)
    })

    ipcRenderer.on('unmaximized', () => {
        setIsMaximized(false)
    })

    const minimizeHandler = () => {
        ipcRenderer.invoke('minimize-event')
    }

    const maximizeHandler = () => {
        ipcRenderer.invoke('maximize-event')
    }

    const unmaximizeHandler = () => {
        ipcRenderer.invoke('unmaximize-event')
    }

    const closeHandler = () => {
        ipcRenderer.invoke('close-event')
    }

    return (
        <div className="Titlebar">
            <div
                className={isActive ? 'Title-Bar' : 'Title-Bar-inactive'}
            >
                <div className="Titlebar-drag-region"></div>
                <div className="Title-Bar__section-icon">
                </div>
                <div className="Title-Bar__section-menubar">
                </div>
                <div className="Title-Bar__section-center">
                </div>
                <div className="Title-Bar__section-windows-control">
                    <div
                        className="section-windows-control_box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeLinejoin="round"><circle onClick={minimizeHandler} className={isActive ? 'minimize-active_logo' : 'minimize-inactive_logo'} cx="11.6" cy="11.6" r="11.4" /></svg>
                    </div>
                    {isMaximized ?
                        <div
                            className="section-windows-control_box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeLinejoin="round"><circle onClick={unmaximizeHandler} className={isActive ? 'unmaximize-active_logo' : 'unmaximize-inactive_logo'} cx="11.6" cy="11.6" r="11.4" /></svg>
                        </div>
                        :
                        <div
                            className="section-windows-control_box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeLinejoin="round"><circle onClick={maximizeHandler} className={isActive ? 'maximize-active_logo' : 'maximize-inactive_logo'} cx="11.6" cy="11.6" r="11.4" /></svg>
                        </div>
                    }
                    <div
                        className="section-windows-control_box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeLinejoin="round"><circle onClick={closeHandler} className={isActive ? 'close-active_logo' : 'close-inactive_logo'} cx="11.6" cy="11.6" r="11.4" /></svg>
                    </div>
                </div>
                <div
                    style={isMaximized ? { display: 'none' } : {}}
                    className="resizer">
                </div>
            </div>
        </div >
    )
}

export default Titlebar