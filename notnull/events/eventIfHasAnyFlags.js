// if for "has any flags"

export const id = 'NOTNULL_IF_FLAGS_HAS_ANY'

export const name = 'If Variable Has Any Flags'

export const groups = ['EVENT_GROUP_CONTROL_FLOW']

export const subGroups = {
  EVENT_GROUP_CONTROL_FLOW: 'EVENT_GROUP_VARIABLES'
}

export const autoLabel = (fetchArg, input) => {
  const flags = [
    input.flag1,
    input.flag2,
    input.flag3,
    input.flag4,
    input.flag5,
    input.flag6,
    input.flag7,
    input.flag8,
    input.flag9,
    input.flag10,
    input.flag11,
    input.flag12,
    input.flag13,
    input.flag14,
    input.flag15,
    input.flag16
  ]
    .map((value, i) => {
      if (value) {
        return String(i + 1)
      }
      return ''
    })
    .filter((i) => i)
    .join(',')

  return `If ${fetchArg('variable')} has any flags ${flags}`
}

export const fields = [].concat(
  [
    {
      key: 'variable',
      label: 'Variable',
      description: 'The variable to use.',
      type: 'variable',
      defaultValue: 'LAST_VARIABLE'
    },
    {
      type: 'break'
    }
  ],
  Array(16)
    .fill()
    .map((_, i) => {
      return {
        key: `flag${i + 1}`,
        label: `Flag ${i + 1}`,
        description: `Must have flag ${i + 1} set to true.`,
        hideFromDocs: i > 3,
        type: 'flag',
        width: '50%',
        flexBasis: '40%',
        defaultValue: false
      }
    }),
  [
    {
      key: 'true',
      label: 'True',
      description: 'The script to run if the condition is true.',
      type: 'events'
    },
    {
      key: '__collapseElse',
      label: 'Else',
      type: 'collapsable',
      defaultValue: true,
      conditions: [
        {
          key: '__disableElse',
          ne: true
        }
      ]
    },
    {
      key: 'false',
      label: 'False',
      description: 'The script to run if the condition is false.',
      conditions: [
        {
          key: '__collapseElse',
          ne: true
        },
        {
          key: '__disableElse',
          ne: true
        }
      ],
      type: 'events'
    }
  ]
)

export const compile = (input, helpers) => {
  const { ifVariableBitwiseValue } = helpers
  const truePath = input.true
  const falsePath = input.__disableElse ? [] : input.false

  let flag = 0
  if (input.flag1) flag |= 0x0001
  if (input.flag2) flag |= 0x0002
  if (input.flag3) flag |= 0x0004
  if (input.flag4) flag |= 0x0008
  if (input.flag5) flag |= 0x0010
  if (input.flag6) flag |= 0x0020
  if (input.flag7) flag |= 0x0040
  if (input.flag8) flag |= 0x0080
  if (input.flag9) flag |= 0x0100
  if (input.flag10) flag |= 0x0200
  if (input.flag11) flag |= 0x0400
  if (input.flag12) flag |= 0x0800
  if (input.flag13) flag |= 0x1000
  if (input.flag14) flag |= 0x2000
  if (input.flag15) flag |= 0x4000
  if (input.flag16) flag |= 0x8000

  ifVariableBitwiseValue(input.variable, '.B_AND', flag, truePath, falsePath)
}
