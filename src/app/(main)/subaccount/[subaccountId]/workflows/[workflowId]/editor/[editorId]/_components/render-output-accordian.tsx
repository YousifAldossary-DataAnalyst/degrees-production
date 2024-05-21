import { ConnectionProviderProps } from '@/providers/connections-provider'

import React from 'react'
import ContentBasedOnTitle from './content-based-on-title'
import { EditorState } from '@/providers/editor/editor-workfllow-provider'
import { useDegreesStore } from '../../../../store'


type Props = {
  state: EditorState
  nodeConnection: ConnectionProviderProps
}

const RenderOutputAccordion = ({ state, nodeConnection }: Props) => {
  const {
    googleFile,
    setGoogleFile,
    selectedSlackChannels,
    setSelectedSlackChannels,
  } = useDegreesStore()
  return (
    <ContentBasedOnTitle
      nodeConnection={nodeConnection}
      newState={state}
      file={googleFile}
      setFile={setGoogleFile}
      selectedSlackChannels={selectedSlackChannels}
      setSelectedSlackChannels={setSelectedSlackChannels}
    />
  )
}

export default RenderOutputAccordion
