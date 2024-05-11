import {
  Contact,
  Lane,
  Notification,
  Prisma,
  Role,
  Tag,
  Ticket,
  User,
} from '@prisma/client'

import {
  _getTicketsWithAllRelations,
  getAuthUserDetails,
  getFunnels,
  getMedia,
  getPipelineDetails,
  getTicketsWithTags,
  getUserPermissions,
} from './queries'
import { db } from './db'
import { z } from 'zod'

import Stripe from 'stripe'

//Notifications
export type NotificationWithUser =
  | ({
      User: {
        id: string
        name: string
        avatarUrl: string
        email: string
        createdAt: Date
        updatedAt: Date
        role: Role
        agencyId: string | null
      }
    } & Notification)[]
  | undefined

//Auth and sidebar options
export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
  typeof getUserPermissions
>


const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
  agencyId: string
) => {
  return await db.user.findFirst({
    where: { Agency: { id: agencyId } },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  })
}

//Aith and sidebar options
export type AuthUserWithAgencySigebarOptionsSubAccounts =
  Prisma.PromiseReturnType<typeof getAuthUserDetails>

export type UsersWithAgencySubAccountPermissionsSidebarOptions =
  Prisma.PromiseReturnType<
    typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
  >

//Media management
export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>

export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput

//Pipelines
export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<
  typeof getPipelineDetails
>

export const CreatePipelineFormSchema = z.object({
  name: z.string().min(1),
})

//Lanes from pipeline cycles
export type LaneDetail = Lane & {
  Tickets: TicketAndTags[]
}

export const LaneFormSchema = z.object({
  name: z.string().min(1),
})

//Ticket management from pipeline
export type TicketAndTags = Ticket & {
  Tags: Tag[]
  Assigned: User | null
  Customer: Contact | null
}

export type TicketWithTags = Prisma.PromiseReturnType<typeof getTicketsWithTags>

const currencyNumberRegex = /^\d+(\.\d{1,2})?$/

export const TicketFormSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  value: z.string().refine((value) => currencyNumberRegex.test(value), {
    message: 'Value must be a valid price.',
  }),
})

export type TicketDetails = Prisma.PromiseReturnType<
  typeof _getTicketsWithAllRelations
>

//Contact info
export const ContactUserFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().email(),
  message: z.string()
})

export type Address = {
  city: string
  country: string
  line1: string
  postal_code: string
  state: string
}

export type ShippingInfo = {
  address: Address
  name: string
}

export type StripeCustomerType = {
  email: string
  name: string
  shipping: ShippingInfo
  address: Address
}

//Prices
export type PricesList = Stripe.ApiList<Stripe.Price>

//Funnels
export const FunnelPageSchema = z.object({
  name: z.string().min(1),
  pathName: z.string().optional(),
})

export const CreateFunnelFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  subDomainName: z.string().optional(),
  favicon: z.string().optional(),
})

export type FunnelsForSubAccount = Prisma.PromiseReturnType<
  typeof getFunnels
>[0]

export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput

//automations:
import { ConnectionProviderProps } from '@/providers/connections-provider'
import { Editor } from '@/providers/editor/editor-workfllow-provider'

export const EditUserProfileSchema = z.object({
  email: z.string().email('Required'),
  name: z.string().min(1, 'Required'),
})

export const WorkflowFormSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(1, 'Required'),
})

export type ConnectionTypes = 'Google Drive' | 'Notion' | 'Slack' | 'Discord'

export type Connection = {
  title: ConnectionTypes
  description: string
  image: string
  connectionKey: keyof ConnectionProviderProps
  accessTokenKey?: string
  alwaysTrue?: boolean
  slackSpecial?: boolean
}

export type EditorCanvasTypes =
  | 'Email'
  | 'Condition'
  | 'AI'
  | 'Slack'
  | 'Google Drive'
  | 'Notion'
  | 'Custom Webhook'
  | 'Google Calendar'
  | 'Trigger'
  | 'Action'
  | 'Wait'

export type EditorCanvasCardType = {
  title: string
  description: string
  completed: boolean
  current: boolean
  metadata: any
  type: EditorCanvasTypes
}

export type EditorNodeType = {
  id: string
  type: EditorCanvasCardType['type']
  position: {
    x: number
    y: number
  }
  data: EditorCanvasCardType
}

export type EditorNode = EditorNodeType

export type EditorActions =
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorNode[]
        edges: {
          id: string
          source: string
          target: string
        }[]
      }
    }
  | {
      type: 'UPDATE_NODE'
      payload: {
        elements: EditorNode[]
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'SELECTED_ELEMENT'
      payload: {
        element: EditorNode
      }
    }

export const nodeMapper: Record<string, string> = {
  Notion: 'notionNode',
  Slack: 'slackNode',
  Discord: 'discordNode',
  'Google Drive': 'googleNode',
}

//Workflow or Automation:
export const CreateFlowFormSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  favicon: z.string().optional(),
})