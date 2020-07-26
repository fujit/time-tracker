import * as DateUtil from './DateUtil'

export const generateTrackerId = (): string => DateUtil.getCurrentDay('YYYYMMDDHHmmssSSS')
