import { quizController } from "./controllers/quizController"
export function Router(app){
    app.get('/',quizController)
}



