import { PencilSquare, Trash } from "@medusajs/icons"
import { AdminCampaignResponse } from "@medusajs/types"
import { Container, Heading, Text, toast, usePrompt } from "@medusajs/ui"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { ActionMenu } from "../../../../../components/common/action-menu"
import { formatDate } from "../../../../../components/common/date"
import { useDeleteCampaign } from "../../../../../hooks/api/campaigns"

type CampaignGeneralSectionProps = {
  campaign: AdminCampaignResponse["campaign"]
}

export const CampaignGeneralSection = ({
  campaign,
}: CampaignGeneralSectionProps) => {
  const { t } = useTranslation()
  const prompt = usePrompt()
  const navigate = useNavigate()
  const promotions = []

  const { mutateAsync } = useDeleteCampaign(campaign.id)

  const handleDelete = async () => {
    const res = await prompt({
      title: t("campaigns.delete.title"),
      description: t("campaigns.delete.description", {
        name: campaign.name,
      }),
      confirmText: t("actions.delete"),
      cancelText: t("actions.cancel"),
    })

    if (!res) {
      return
    }

    await mutateAsync(undefined, {
      onSuccess: () => {
        toast.success(t("general.success"), {
          description: t("campaigns.delete.successToast", {
            name: campaign.name,
          }),
          dismissLabel: t("actions.close"),
        })

        navigate("/campaigns", { replace: true })
      },
      onError: (error) => {
        toast.error(t("general.error"), {
          description: error.message,
          dismissLabel: t("actions.close"),
        })
      },
    })
  }

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading>{campaign.name}</Heading>

        <ActionMenu
          groups={[
            {
              actions: [
                {
                  icon: <PencilSquare />,
                  label: t("actions.edit"),
                  to: `/campaigns/${campaign.id}/edit`,
                },
              ],
            },
            {
              actions: [
                {
                  icon: <Trash />,
                  label: t("actions.delete"),
                  onClick: handleDelete,
                },
              ],
            },
          ]}
        />
      </div>

      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("campaigns.fields.identifier")}
        </Text>

        <Text size="small" leading="compact">
          {campaign.campaign_identifier}
        </Text>
      </div>

      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("fields.description")}
        </Text>

        <Text size="small" leading="compact">
          {campaign.description || "-"}
        </Text>
      </div>

      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("fields.currency")}
        </Text>

        <Text size="small" leading="compact">
          {campaign.currency}
        </Text>
      </div>

      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("campaigns.fields.start_date")}
        </Text>

        <Text size="small" leading="compact">
          {formatDate(campaign.starts_at)}
        </Text>
      </div>

      <div className="text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4">
        <Text size="small" leading="compact" weight="plus">
          {t("campaigns.fields.end_date")}
        </Text>

        <Text size="small" leading="compact">
          {formatDate(campaign.ends_at)}
        </Text>
      </div>
    </Container>
  )
}
