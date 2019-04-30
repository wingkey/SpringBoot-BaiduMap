USE [EXTbank]
GO

/****** Object:  Table [dbo].[baidumap_user]    Script Date: 04/30/2019 10:47:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[baidumap_user](
	[id] [nvarchar](50) NOT NULL,
	[name] [nvarchar](10) NOT NULL,
	[phone] [nvarchar](50) NULL,
	[address] [nvarchar](50) NOT NULL,
	[rank] [nvarchar](50) NOT NULL,
	[others] [nvarchar](50) NULL,
 CONSTRAINT [PK_baidumap_user] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO


