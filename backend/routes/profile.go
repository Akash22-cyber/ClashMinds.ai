package routes

import (
	"clashminds/controllers"

	"github.com/gin-gonic/gin"
)

func GetProfileRouteHandler(ctx *gin.Context) {
	controllers.GetProfile(ctx)
}

func UpdateProfileRouteHandler(ctx *gin.Context) {
	controllers.UpdateProfile(ctx)
}

func UpdateEloAfterDebateRouteHandler(ctx *gin.Context) {
	controllers.UpdateEloAfterDebate(ctx)
}
