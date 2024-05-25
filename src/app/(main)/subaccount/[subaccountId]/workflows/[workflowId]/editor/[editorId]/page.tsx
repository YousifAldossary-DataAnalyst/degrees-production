import { ConnectionsProvider } from '@/providers/connections-provider'
import React from 'react'
import EditorCanvas from './_components/editor-canvas'
import EditorWorkflowProvider from '@/providers/editor/editor-workfllow-provider'
import BlurPage from '@/components/global/blur-page'

type Props = {}

const Page = (props: Props) => {
  return (
    <BlurPage>
    <div className="h-full">
      <EditorWorkflowProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorWorkflowProvider>
    </div>
    </BlurPage>
  )
}

export default Page