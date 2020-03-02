// react plugin for creating notifications over the dashboard
import React from 'react'
import PropTypes from 'prop-types'
import NotificationAlert from 'react-notification-alert'
import './styles.css'

const DEFAULT_OPTIONS = {
  place: 'tr',
  message: '',
  type: 'primary',
  icon: 'tim-icons icon-bell-55',
  autoDismiss: 4
}

class AlertGlobal extends React.Component {
 /* componentDidUpdate (prevProps) {
    if (this.props.message) {
      let options = {}
      if (this.props.options) {
        options = this.props.options
        options.message = this.props.message
      } else {
        options = {
          ...DEFAULT_OPTIONS,
          message: this.props.message,
          icon: 'tim-icons ' + this.props.icon,
          type: this.props.type,
          autoDismiss: this.props.autoDismiss,
          place: this.props.place
        }
      }
      this.refs.notificationAlert.notificationAlert(options)
    }
  }*/

  showAlert=(data) => {
    const { message, options } = data
    if (message) {
      let finalOptions = {}
      if (!options) {
        finalOptions = {...DEFAULT_OPTIONS}
        finalOptions['message'] = message
      } else {
        finalOptions = {
          ...DEFAULT_OPTIONS,
          message: message,
          icon: (options.icon) ? ('tim-icons ' + options.icon) : DEFAULT_OPTIONS.icon,
          type: (options.type) ? options.type : DEFAULT_OPTIONS.type,
          autoDismiss: (options.autoDismiss) ? options.autoDismiss : DEFAULT_OPTIONS.autoDismiss,
          place: (options.place) ? options.place : DEFAULT_OPTIONS.place
        }
      }
      this.refs.notificationAlert.notificationAlert(finalOptions)
    }
  }


  render () {
    return (
      <div className='rna-container'>
        <NotificationAlert ref='notificationAlert' className='alertMt30' />
      </div>
    )
  }
}

AlertGlobal.propTypes = {
  message: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string,
  autoDismiss: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number
  ]),
  place: PropTypes.string,
  options: PropTypes.object
}

// Specifies the default values for props:
AlertGlobal.defaultProps = {
  message: DEFAULT_OPTIONS.message,
  icon: DEFAULT_OPTIONS.icon,
  type: DEFAULT_OPTIONS.type,
  autoDismiss: DEFAULT_OPTIONS.autoDismiss,
  place: DEFAULT_OPTIONS.place
}

export default AlertGlobal
