import { useState, useCallback, useMemo } from 'react'
import { validate } from '../Constants'

type FormValue = {
  key?: number
  name: string
  suggestProjects: Project[]
}

export type UseTrackerFormResult = [FormValue, boolean, (value: string) => void]

export const useTrackerForm = (name: string, key?: number): UseTrackerFormResult => {
  const [trackerName, setTrackerName] = useState(name)
  const [trackerKey, setTrackerKey] = useState(key)
  const [suggestProjects, setSuggestProjects] = useState([] as Project[])

  const extractKey = (value: string) => {
    const regexKey = value.match(/^#[0-9]+ /)
    if (!regexKey) {
      return
    }

    const inputKey = Number.parseInt(regexKey[0].replace('#', '').trim(), 10)

    if (Number.isNaN(inputKey)) {
      return
    }

    return inputKey
  }

  const splitName = useCallback((value: string): { name: string; key?: number } => {
    const projectKey = extractKey(value)
    if (projectKey) {
      const projectName = value.replace(`#${projectKey.toString()}`, '').trim()

      return { name: projectName, key: projectKey }
    }

    return { name: value, key: undefined }
  }, [])

  const fetchSuggestNames = useCallback(async (formValueName: string) => {
    const projectName = formValueName.replace(/#/g, '')
    const res = await fetch(`/api/project?projectName=${projectName}`)
    const projects: Project[] = await res.json()

    return projects
  }, [])

  const changeTrackerName = useCallback(
    (value: string) => {
      const trimValue = value.replace(/\s/g, ' ')
      const formValue = splitName(trimValue)

      console.log('value ->', value)
      console.log('trimValue -> ', trimValue)
      setTrackerName(trimValue)
      setTrackerKey(formValue.key)

      if (formValue.key || formValue.name.length > 2) {
        fetchSuggestNames(formValue.name)
          .then((projects) => {
            setSuggestProjects(projects)
          })
          .catch(() => {
            setSuggestProjects([])
          })
      }
    },
    [splitName, fetchSuggestNames]
  )

  // TODO: 登録済みの名前制御
  const isValid = useMemo(
    () => !!trackerName && trackerName.length <= validate.trackerName.length,
    [trackerName]
  )

  return [{ key: trackerKey, name: trackerName, suggestProjects }, isValid, changeTrackerName]
}
