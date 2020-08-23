import dayjs from 'dayjs'

export const getCurrentDate = (): Date => dayjs().toDate()

export const getCurrentDay = (template = 'YYYY-MM-DD'): string => dayjs().format(template)

export const getTimeFromNow = (
  date: dayjs.ConfigType,
  unit?: dayjs.QUnitType | dayjs.OpUnitType,
  float?: boolean
): number => dayjs().diff(date, unit, float)

export const getDiff = (
  date1: Date,
  date2: Date,
  unit?: dayjs.QUnitType | dayjs.OpUnitType,
  float?: boolean
) => dayjs(date2).diff(date1, unit, float)

export const format = (date: dayjs.ConfigType, template = 'YYYY-MM-DD HH:mm:ss'): string =>
  dayjs(date).format(template)

export const updateTime = (date: Date, time: string) => {
  const times = time.split(':')
  return dayjs(date)
    .set('hour', parseInt(times[0], 10))
    .set('minute', parseInt(times[1], 10))
    .toDate()
}
