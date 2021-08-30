import React, {useState, useEffect, useContext } from 'react'

import styles from './style'

const TabsContext = React.createContext({
    activeId: 'string',
    tabs: [],
    setTabs: (data: any) => {},
});


const Tabs = (props: any) => {
    const [tabs, setTabs] = useState([])
    const [activeId, setActiveId] = useState(props.activeId)
    const tab = (Array.isArray(tabs) && tabs.find((tab: any) => tab && tab.id === activeId)) || {}

    return (
        <TabsContext.Provider 
        value={{
            activeId,
            tabs,
            setTabs,
        }}>
            <div style={styles.tabs}>
                <div style={styles.tabsHeader}>
                    {Array.isArray(tabs) && tabs.map((tab: any, index: number) => {
                        return (
                            <div key={index} onPress={() => setActiveId(tab.id)}>
                                <span style={styles.tabName}>{tab.name}</span>
                            </div>
                        )
                    })}
                </div>
                <div style={styles.tabsContent}>
                    {props.children}
                </div>
            </div>
        </TabsContext.Provider>
    )

}

const TabPane = (props: any) => {
    const tabsContext = useContext(TabsContext)
    useEffect(() => {
        tabsContext.setTabs((tabs: any) => [...tabs, {...props}])
        return () => {
            tabsContext.setTabs([])
        }
    }, [])
    return (
        tabsContext.activeId === props.id ? props.children : null
    )
}

Tabs.TabPane = TabPane

export default Tabs