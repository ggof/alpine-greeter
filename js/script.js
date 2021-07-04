const makeClock = () => {
  return {
    time: new Date().toLocaleString(),
    start() { setInterval(() => (this.time = new Date().toLocaleString()), 1000) },
  }
}

const makeForm = () => {
  return {
    users: lightdm.users,
    sessions: lightdm.sessions,
    username: "",
    password: "",
    session: "",
    has_error: false,
    error: "",
    loading: false,
    success: true,

    init() {
      let conf = localStorage.getItem("alpine__conf")
      if (!conf) {
        conf = {
          session: lightdm.sessions[0].key,
          username: lightdm.users[0].name,
        }
      } else {
        conf = JSON.parse(conf)
      }

      this.session = conf.session
      this.username = conf.username

      window.show_prompt = (text, type) => {
        if (type === "error") {
          this.error = text
          this.has_error = true
        }
      }

      window.show_message = (text, type) => {
        if (type === "error") {
          this.error = text
          this.has_error = true
        }
      }

      window.authentication_complete = () => {
        if (lightdm.is_authenticated) {
          this.success = true // start backdrop animation
          setTimeout(() => this.saveAndStart(conf), 1000);
        } else {
          window.show_message("invalid password ...", "error")
          lightdm.authenticate(this.username)
        }
      }

      window.autologin_timer_expired = () => { }

      if (lightdm.in_authentication || lightdm.authentication_user || lightdm._username) {
        lightdm.cancel_authentication()
      }

      lightdm.authenticate(this.username)

      setTimeout(() => (this.success = false), 1000);
    },

    setUsername(e) {
      this.username = e.target.value
      if (lightdm.in_authentication || lightdm.authentication_user || lightdm._username) {
        lightdm.cancel_authentication()
      }

      lightdm.authenticate(this.username)
    },

    setSession(e) {
      this.session = e.target.value;
    },

    submit() {
      this.has_error = false
      lightdm.respond(this.password)
    },

    hibernate() {
      if (lightdm.can_hibernate) {
        lightdm.hibernate()
      }
    },

    restart() {
      if (lightdm.can_restart) {
        lightdm.restart()
      }
    },

    shutdown() {
      if (lightdm.can_shutdown) {
        lightdm.shutdown()
      }
    },

    suspend() {
      if (lightdm.can_suspend) {
        lightdm.suspend()
      }
    },

    saveAndStart(conf) {
      conf.session = this.session
      conf.username = this.username
      localStorage.setItem("alpine__conf", JSON.stringify(conf))
      lightdm.start_session_sync(this.session)
    }
  }
}
