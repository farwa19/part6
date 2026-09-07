import { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, setNotification] = useState(null)

  return (
    <NotificationContext.Provider value={[notification, setNotification]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const value = useContext(NotificationContext)
  return value[0]
}

export const useNotificationDispatch = () => {
  const value = useContext(NotificationContext)
  return value[1]
}

export const Notification = () => {
  const notification = useNotificationValue()

  if (!notification) {
    return null
  }

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  return (
    <div style={style} id="notification" data-testid="notification">
      {notification}
    </div>
  )
}

export default NotificationContext