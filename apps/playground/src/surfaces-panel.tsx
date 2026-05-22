import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@neurex/ui"

export const SurfacesPanel = () => {
  return (
    <>
      <section className="component-panel" aria-labelledby="card-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Card</p>
            <h2 id="card-title">Surface variants</h2>
          </div>
        </div>

        <div className="card-board">
          <Card>
            <CardHeader>
              <CardTitle>Surface Card</CardTitle>
              <CardDescription>
                Token-driven background, border, radius, and spacing.
              </CardDescription>
            </CardHeader>
            <CardContent>
              This card uses the default surface mapping from the active theme.
            </CardContent>
            <CardFooter>
              <Button size="sm">Install card</Button>
              <Button size="sm" variant="secondary">
                Preview
              </Button>
            </CardFooter>
          </Card>

          <Card variant="muted">
            <CardHeader>
              <CardTitle>Muted Card</CardTitle>
              <CardDescription>
                The same structure with a quieter surface treatment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              This checks that Card variants still compose with semantic theme
              tokens.
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="secondary">
                Secondary
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      <section className="component-panel" aria-labelledby="badge-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Badge</p>
            <h2 id="badge-title">Tone and variant matrix</h2>
          </div>
        </div>

        <div className="badge-board">
          <Badge size="sm">Neutral sm</Badge>
          <Badge tone="primary">Primary</Badge>
          <Badge tone="destructive">Destructive</Badge>
          <Badge variant="outline">Neutral outline</Badge>
          <Badge tone="primary" variant="outline">
            Primary outline
          </Badge>
        </div>
      </section>

      <section className="component-panel" aria-labelledby="avatar-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Avatar</p>
            <h2 id="avatar-title">Image and fallback states</h2>
          </div>
        </div>

        <div className="badge-board">
          <Avatar size="sm">
            <AvatarImage
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=96&q=80"
              alt="Neurex profile"
            />
            <AvatarFallback>NX</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <Avatar size="lg" shape="square">
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>
        </div>
      </section>

      <section className="component-panel" aria-labelledby="alert-title">
        <div className="panel-header">
          <div>
            <p className="playground-label">Alert</p>
            <h2 id="alert-title">Feedback tones</h2>
          </div>
        </div>

        <div className="alert-board">
          <Alert>
            <AlertTitle>Neutral alert</AlertTitle>
            <AlertDescription>
              A calm system message using surface and border tokens.
            </AlertDescription>
          </Alert>
          <Alert tone="primary">
            <AlertTitle>Primary alert</AlertTitle>
            <AlertDescription>
              A highlighted message mapped through primary semantic tokens.
            </AlertDescription>
          </Alert>
          <Alert tone="destructive">
            <AlertTitle>Destructive alert</AlertTitle>
            <AlertDescription>
              A critical message using destructive semantic token mapping.
            </AlertDescription>
          </Alert>
        </div>
      </section>
    </>
  )
}
