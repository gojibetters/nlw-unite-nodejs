import fastify from 'fastify'
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import fastifyCors from '@fastify/cors';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from "fastify-type-provider-zod"

import { createEvent } from './routes/create-event';
import { RegisterForEvent } from './routes/register-for-event';
import { getEvent } from './routes/get-event';
import { getAttendeeBadge } from './routes/get-attendee-badge';
import { CheckIn } from './routes/check-in';
import { getEventAtteendees } from './routes/get-event-attendees';
import { errorHandler } from './error-handler';

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Especificações da API para o backend da aplicação pass.in construída durante o NLW Unite da Rocketseat.',
      version: '1.0.0'
    },
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createEvent)
app.register(RegisterForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(CheckIn)
app.register(getEventAtteendees)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP server running')
})