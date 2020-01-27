import React, { useState, useEffect } from "react"
import styled, { createGlobalStyle, ThemeProvider } from "styled-components"

// GlobalStyle should set the body background to red
// unless the theme is localstorage; then the background is green
const GlobalStyle = createGlobalStyle`
  body {
    color: white;
    background-color: red;
    ${props =>
      props.theme.mode === "localstorage" && "background-color: green;"}
  }
`

// StyledP should set its background to blue
// unless the theme is localstorage; then the background is green
const StyledP = styled.p`
  background-color: blue;
  ${props => props.theme.mode === "localstorage" && "background-color: green;"}
`

export default () => {
  // We load the state from localstorage,
  // defaulting to 'default' if localstorage is unavailable or unset.
  // This means that the ssr site will always be rendered as 'default'
  const [theme, setTheme] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("storageTheme") ?? "default"
      : "default"
  )

  // commenting out the lines inside useState()
  // and enabling these lines fixes the problem
  // useEffect(() => {
  //   setTheme(
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("storageTheme") ?? "default"
  //       : "default"
  //   )
  // }, [setTheme])

  const changeTheme = event => {
    localStorage.setItem("storageTheme", event.target.value)
    setTheme(event.target.value)
  }
  return (
    <ThemeProvider theme={{ mode: theme }}>
      <GlobalStyle />

      <h1> The theme is {theme} </h1>

      <p>
        GlobalStyle turns the body red when 'default', green when 'localstorage'
      </p>
      <StyledP>
        StyledP turns this blue when 'default', green when 'localstorage'
      </StyledP>

      <select value={theme} onChange={changeTheme}>
        <option value="default">Default</option>
        <option value="localstorage">LocalStorage</option>
      </select>
    </ThemeProvider>
  )
}
