import dayjs from 'dayjs'

export const getCurrentDate = (): Date => dayjs().toDate()

export const getTimeFromNow = (
  date: dayjs.ConfigType,
  unit?: dayjs.QUnitType | dayjs.OpUnitType,
  float?: boolean
): number => dayjs().diff(date, unit, float)
