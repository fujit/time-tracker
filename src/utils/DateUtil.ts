import dayjs from 'dayjs'

export const getCurrentDate = (): Date => dayjs().toDate()

export const getCurrentDay = (template = 'YYYY-MM-DD'): string => dayjs().format(template)

export const getTimeFromNow = (
  date: dayjs.ConfigType,
  unit?: dayjs.QUnitType | dayjs.OpUnitType,
  float?: boolean
): number => dayjs().diff(date, unit, float)

export const format = (date: dayjs.ConfigType, template = 'YYYY-MM-DD HH:mm:ss'): string =>
  dayjs(date).format(template)
