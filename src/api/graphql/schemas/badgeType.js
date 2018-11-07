export default `
  interface Badge {
    id: ID!
    description: String
  }

  type OrangeBadge implements Badge {
    id: ID!
    description: OrangeBadgesDescription
  }

  type YellowBadge implements Badge {
    id: ID!
    description: YellowBadgesDescription
  }

  type GreenBadge implements Badge {
    id: ID!
    description: GreenBadgesDescription
  }

  type BlueBadge implements Badge {
    id: ID!
    description: BlueBadgesDescription
  }

  type IndigoBadge implements Badge {
    id: ID!
    description: IndigoBadgesDescription
  }

  type PurpleBadge implements Badge {
    id: ID!
    description: PurpleBadgesDescription
  }

  enum OrangeBadgesDescription {
    CRT_5_TASK_W
    CRT_15_TASK_M

    CRT_5_DISCUSSION_W
    CRT_15_DISCUSSION_M

    CRT_10_COMMENT_W
    CRT_30_COMMENT_M

    CRT_10_REPLY_W
    CRT_30_REPLY_M
  }

  enum YellowBadgesDescription {
    GFL_5_DISCUSSION_W
    GFL_15_DISCUSSION_M

    GAP_5_DISCUSSION_W
    GAP_15_DISCUSSION_M

    GAP_5_TASK_W
    GAP_15_TASK_M

    GAP_5_COMMENT_W
    GAP_15_COMMENT_M

    GAP_5_REPLY_W
    GAP_15_REPLY_M
  }

  enum GreenBadgesDescription {
    MIP_3_TASK_W
    MIP_10_TASK_M

    MDN_3_TASK_W
    MDN_10_TASK_M

    MSV_5_DISCUSSION_W
    MSV_15_DISCUSSION_M

    MSL_3_COMMENT_W
    MSL_10_COMMENT_M

    MHF_3_COMMENT_W
    MHF_10_COMMENT_M
  }

  enum BlueBadgesDescription {
    CRT_25_TASK_A
    CRT_25_DISCUSSION_A
    CRT_25_COMMENT_A
    CRT_25_REPLY_A

    GFL_25_DISCUSSION_A
    GAP_25_DISCUSSION_A
    GAP_25_TASK_A
    GAP_25_COMMENT_A
    GAP_25_REPLY_A

    MIP_25_TASK_A
    MDN_25_TASK_A
    MSV_25_DISCUSSION_A
    MSL_25_COMMENT_A
    MHF_25_COMMENT_A
  }

  enum IndigoBadgesDescription {
    CRT_50_TASK_A
    CRT_50_DISCUSSION_A
    CRT_50_COMMENT_A
    CRT_50_REPLY_A

    GFL_50_DISCUSSION_A
    GAP_50_DISCUSSION_A
    GAP_50_TASK_A
    GAP_50_COMMENT_A
    GAP_50_REPLY_A

    MIP_50_TASK_A
    MDN_50_TASK_A
    MSV_50_DISCUSSION_A
    MSL_50_COMMENT_A
    MHF_50_COMMENT_A
  }

  enum PurpleBadgesDescription {
    CRT_100_TASK_A
    CRT_100_DISCUSSION_A
    CRT_100_COMMENT_A
    CRT_100_REPLY_A

    GFL_100_DISCUSSION_A
    GAP_100_DISCUSSION_A
    GAP_100_TASK_A
    GAP_100_COMMENT_A
    GAP_100_REPLY_A

    MIP_100_TASK_A
    MDN_100_TASK_A
    MSV_100_DISCUSSION_A
    MSL_100_COMMENT_A
    MHF_100_COMMENT_A
  }
`;
